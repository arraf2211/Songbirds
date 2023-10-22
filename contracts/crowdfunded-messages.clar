
;; title: crowdfunded-messages
;; version:
;; summary:
;; description:

(define-constant contract-owner tx-sender)

(define-constant err-contract-owner-only (err u100))
(define-constant err-message-with-this-title-already-exists (err u101))
(define-constant err-message-not-released-yet (err u102))
(define-constant err-cant-like-your-own-message (err u103))
(define-constant err-no-message-with-this-title (err u104))
(define-constant err-index-larger-than-list-size (err u105))
(define-constant err-message-owner-only (err u106))
(define-constant err-invalid-message-hash (err u107))
(define-constant err-cant-fund-your-own-message (err u108))
(define-constant err-not-enough-funding (err u109))
(define-constant err-insufficient-funds (err u110))

(define-map messages-map { title: (string-utf8 50) } { owner: principal, required-funds: uint, current-funds: uint, start-block-height: uint, hash: (buff 32), likes: (list 100 principal), revealed: bool, content: (optional (string-utf8 500)) })
(define-data-var message-titles (list 100 (string-utf8 50)) (list ))
(define-map credibility-map { user: principal } { credibility: uint })

;; #[allow(unchecked_data)]
(define-public (post-message (title (string-utf8 50)) (required-funds uint) (hash (buff 32)))
    (begin 
    (asserts! (is-eq true (map-insert messages-map { title: title } { owner: tx-sender, required-funds: required-funds, current-funds: u0, start-block-height: block-height, hash: hash, likes: (list ), revealed: false, content: none })) err-message-with-this-title-already-exists)
    (asserts! (>= (stx-get-balance tx-sender) u1000000) err-insufficient-funds) ;; 1 STX
    (unwrap-panic (stx-transfer? u1000000 tx-sender (as-contract tx-sender)))
    (var-set message-titles (unwrap-panic (as-max-len? (append (var-get message-titles) title) u100))) ;; max_len (u100) should be set as same size as max_len for options-names
    (ok true)
    )
)


;; #[allow(unchecked_data)]
(define-public (like-message (title (string-utf8 50))) ;; return true if liked, return false if unliked
    (let
      (
        (message (map-get? messages-map { title: title } ))
      )
      (asserts! (is-some message) err-no-message-with-this-title)
      (asserts! (not (is-eq (some tx-sender) (get owner message))) err-cant-like-your-own-message)
      (if (is-some (index-of? (get likes (unwrap-panic message)) tx-sender)) ;; if true then remove like and return false, if false add like and return true
        (begin
          (map-set messages-map { title: title } (merge (unwrap-panic message) { likes: (unwrap-panic (as-max-len? (remove-from-list (get likes (unwrap-panic message)) (unwrap-panic (index-of? (get likes (unwrap-panic message)) tx-sender))) u100)) }))
          (ok false)
        )
        (begin
          (asserts! (>= (stx-get-balance tx-sender) u10000) err-insufficient-funds) ;; 0.01 STX
          (unwrap-panic (stx-transfer? u10000 tx-sender (as-contract tx-sender)))
          (map-set messages-map { title: title } (merge (unwrap-panic message) { likes: (unwrap-panic (as-max-len? (append (get likes (unwrap-panic message)) tx-sender) u100)) }))
          (ok true)
        )
      ) 
    )
)

(define-read-only (get-message (title (string-utf8 50)))
    (let 
      (
        (message (map-get? messages-map { title: title } ))
      )
      (asserts! (is-some message) err-no-message-with-this-title)
      (ok (unwrap-panic (map-get? messages-map { title: title } )))
    )
)

(define-read-only (get-message-titles)
      ;; (ok (map get-message (var-get message-titles)))
      (ok (var-get message-titles))
)

(define-private (remove-from-list (listToRemove (list 100 principal)) (index uint))
    (let 
      (
        (some-slice1 (slice? listToRemove u0 index))
        (some-slice2 (slice? listToRemove (+ u1 index) (len listToRemove)))
      ) 
      ;; (asserts! (< index (len listToRemove)) err-index-larger-than-list-size)
      (if (is-some some-slice2)
      (concat 
      (unwrap-panic some-slice1)
      (unwrap-panic some-slice2)
      )
      (unwrap-panic some-slice1))
    )
)

;; #[allow(unchecked_data)]
(define-public (reveal-message (title (string-utf8 50)) (content (string-utf8 500)))
    (let
      (
        (message (map-get? messages-map { title: title } ))
        (derived-hash (sha256 (unwrap-panic (to-consensus-buff? content))))
        (sender tx-sender)
      ) 
      (asserts! (is-eq (some tx-sender) (get owner message)) err-message-owner-only)
      (asserts! (>= (unwrap-panic (get current-funds message)) (unwrap-panic (get required-funds message))) err-not-enough-funding)
      (asserts! (is-eq derived-hash (unwrap-panic (get hash message))) err-invalid-message-hash)
      (map-set messages-map { title: title } (merge (unwrap-panic message) { content: (some content), revealed: true }))
      (asserts! (>= (stx-get-balance (as-contract tx-sender)) u950000) err-insufficient-funds) ;; 0.95 STX
      (unwrap-panic (as-contract (stx-transfer? u950000 (as-contract tx-sender) sender)))
      (ok true)
    )
)

(define-public (fund-message (title (string-utf8 50)) (amount uint))
    (let
      (
        (message (map-get? messages-map { title: title } ))
      )
      ;; (asserts! (not (is-eq (some tx-sender) (get owner message))) err-cant-fund-your-own-message)
      (asserts! (>= (stx-get-balance tx-sender) amount) err-insufficient-funds) ;; 1 STX
      (unwrap-panic (stx-transfer? amount tx-sender (as-contract tx-sender)))
      (ok (map-set messages-map { title: title } (merge (unwrap-panic message) { current-funds: (+ amount (unwrap-panic (get current-funds message))) })))
    )
)