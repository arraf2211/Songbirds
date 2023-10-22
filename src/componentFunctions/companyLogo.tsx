import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"
  
  export function CompanyLogo() {
    return (
      <Avatar>
        <AvatarImage src="../../../karimdrip.jpg" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    )
  }
  