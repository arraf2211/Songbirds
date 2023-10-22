import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  
  const stories = [
    {
        title: "CEO does crime",
        description: "Well known corrupt CEO has commited a serious crime. This is the second time in a row he has done some really bad things. For real we need to put this guy in a box where he cant keep doing more bad things!",
        owner: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F",
        released: false,
        hash: "f0fda58630310a6dd91a7d8f0a4ceda2",
        currentFunds: "0.5 Eth",
        requiredFunds: "0.5 Eth",
        likes: 1023
    },
    {
        title: "CEO does crime",
        description: "Well known corrupt CEO has commited a serious crime. This is the second time in a row he has done some really bad things. For real we need to put this guy in a box where he cant keep doing more bad things!",
        owner: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F",
        released: true,
        hash: "bfd280436f45fa38eaacac3b00518f29",
        currentFunds: BigInt(10000),
        requiredFunds: BigInt(200000),
        likes: 1023
    },
    {
        title: "CEO does crime",
        description: "Well known corrupt CEO has commited a serious crime. This is the second time in a row he has done some really bad things. For real we need to put this guy in a box where he cant keep doing more bad things!",
        owner: "",
        released: false,
        hash: "kfjnkjnrgkejrnge",
        currentFunds: BigInt(10000),
        requiredFunds: BigInt(200000),
        likes: 1023
    },
    {
        title: "CEO does crime",
        description: "Well known corrupt CEO has commited a serious crime. This is the second time in a row he has done some really bad things. For real we need to put this guy in a box where he cant keep doing more bad things!",
        owner: "",
        released: false,
        hash: "kfjnkjnrgkejrnge",
        currentFunds: BigInt(10000),
        requiredFunds: BigInt(200000),
        likes: 1023
    },
    {
        title: "CEO does crime",
        description: "Well known corrupt CEO has commited a serious crime. This is the second time in a row he has done some really bad things. For real we need to put this guy in a box where he cant keep doing more bad things!",
        owner: "",
        released: false,
        hash: "kfjnkjnrgkejrnge",
        currentFunds: BigInt(20000),
        requiredFunds: BigInt(30000),
        likes: 1023
    },
    
  ]
  
  export function TableData() {
    return (
      <Table>
        <TableCaption>Ongoing Stories</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Title</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Owner</TableHead>
            <TableHead className="text-right">Released</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {stories.map((stories) => (
            <TableRow key={stories.title}>
                <TableCell>{stories.title}</TableCell>
              <TableCell className="font-medium">{stories.description}</TableCell>
              <TableCell>{stories.owner}</TableCell>
              <TableCell>{stories.released}</TableCell>
              <TableCell className="text-right">{stories.requiredFunds}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )
  }
  