
//import { useRouter } from "next/navigation";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Clock, CheckCircle, AlertCircle } from "lucide-react"

export default  async function Home() {


  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case 'available':
        return <Badge variant="secondary" className="flex items-center gap-1"><CheckCircle className="w-3 h-3" /> Available</Badge>
      case 'in use':
        return <Badge variant="destructive" className="flex items-center gap-1"><Clock className="w-3 h-3" /> In Use</Badge>
      default:
        return <Badge variant="secondary" className="flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {status}</Badge>
    }
  }
  
  const res = await fetch(`${process.env.NEXT_PUBLIC_WASH_API_URL}/machines/all`);
  const machines = await res.json();
  console.log('fetched');


  return (
    <div className="flex flex-col items-center  min-h-screen py-2">
      <h1 className="font-bold text-black mb-4 mt-8 text-center text-4xl md:text-6xl">Laundry ETAs:</h1>
      <div className="container mx-auto p-4">
      <Table className="w-full border border-border rounded-lg overflow-hidden">
        <TableCaption className="text-lg font-semibold mb-4">Washer and Dryer Status</TableCaption>
        <TableHeader className="bg-muted">
          <TableRow>
            <TableHead className="font-bold text-primary">Name</TableHead>
            <TableHead className="font-bold text-primary">ETA</TableHead>
            <TableHead className="font-bold text-primary">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {machines.map((machine: any) => (
            <TableRow key={machine.serial_number} className="hover:bg-muted/50 transition-colors">
              <TableCell className="font-medium">{machine.name}</TableCell>
              <TableCell>
                {machine.time_remaining ? (
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    {machine.time_remaining}
                  </span>
                ) : (
                  'N/A'
                )}
              </TableCell>
              <TableCell>{getStatusBadge(machine.status)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
    </div>

  );
}

