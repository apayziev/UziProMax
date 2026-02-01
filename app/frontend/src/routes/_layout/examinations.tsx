import { createFileRoute } from "@tanstack/react-router"
import { useState } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { Search, FileText, Calendar, MoreHorizontal, Eye, Printer, Trash2, Filter } from "lucide-react"
import { Link } from "@tanstack/react-router"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"

import { TEMPLATE_TYPES, type ExaminationListResponse } from "@/types/medical"

export const Route = createFileRoute("/_layout/examinations")({
  component: ExaminationsPage,
})

// API functions
async function fetchExaminations(
  page: number,
  templateType?: string,
  status?: string
): Promise<ExaminationListResponse> {
  const params = new URLSearchParams({ page: String(page), per_page: "20" })
  if (templateType && templateType !== "all") params.set("template_type", templateType)
  if (status && status !== "all") params.set("status", status)
  
  const response = await fetch(`/api/v1/examinations?${params}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` },
  })
  if (!response.ok) throw new Error("Failed to fetch examinations")
  return response.json()
}

async function deleteExamination(id: number): Promise<void> {
  const response = await fetch(`/api/v1/examinations/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` },
  })
  if (!response.ok) throw new Error("Failed to delete examination")
}

function ExaminationsPage() {
  const [page, setPage] = useState(1)
  const [templateFilter, setTemplateFilter] = useState<string>("all")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  
  const { toast } = useToast()
  const queryClient = useQueryClient()

  const { data, isLoading } = useQuery({
    queryKey: ["examinations", page, templateFilter, statusFilter],
    queryFn: () => fetchExaminations(page, templateFilter, statusFilter),
  })

  const deleteMutation = useMutation({
    mutationFn: deleteExamination,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["examinations"] })
      toast({ title: "O'chirildi", description: "Tekshiruv o'chirildi" })
    },
  })

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("uz-UZ")
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "draft":
        return <Badge variant="secondary">Qoralama</Badge>
      case "completed":
        return <Badge variant="default">Tugallangan</Badge>
      case "printed":
        return <Badge variant="outline">Chop etilgan</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Tekshiruvlar</h1>
          <p className="text-muted-foreground">Barcha UZI tekshiruvlar ro'yxati</p>
        </div>
        <Link to="/examinations/new">
          <Button>
            <FileText className="mr-2 h-4 w-4" />
            Yangi tekshiruv
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <div className="w-[200px]">
              <Select value={templateFilter} onValueChange={setTemplateFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Shablon turi" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Barcha shablonlar</SelectItem>
                  {Object.entries(TEMPLATE_TYPES).map(([key, value]) => (
                    <SelectItem key={key} value={key}>
                      {value.name_ru}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="w-[180px]">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Holat" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Barcha holatlar</SelectItem>
                  <SelectItem value="draft">Qoralama</SelectItem>
                  <SelectItem value="completed">Tugallangan</SelectItem>
                  <SelectItem value="printed">Chop etilgan</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardContent className="pt-6">
          {isLoading ? (
            <div className="flex items-center justify-center py-10">
              <div className="text-muted-foreground">Yuklanmoqda...</div>
            </div>
          ) : data?.items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10">
              <FileText className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground">Tekshiruvlar topilmadi</p>
            </div>
          ) : (
            <>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Sana</TableHead>
                    <TableHead>Bemor</TableHead>
                    <TableHead>Tekshiruv turi</TableHead>
                    <TableHead>Holat</TableHead>
                    <TableHead>Yaratilgan</TableHead>
                    <TableHead className="w-[70px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data?.items.map((exam) => (
                    <TableRow key={exam.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          {formatDate(exam.examination_date)}
                        </div>
                      </TableCell>
                      <TableCell>{exam.patient_name || "-"}</TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {TEMPLATE_TYPES[exam.template_type]?.name_ru || exam.template_type}
                        </Badge>
                      </TableCell>
                      <TableCell>{getStatusBadge(exam.status)}</TableCell>
                      <TableCell className="text-muted-foreground">
                        {formatDate(exam.created_at)}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem asChild>
                              <Link to={`/examinations/${exam.id}`}>
                                <Eye className="mr-2 h-4 w-4" />
                                Ko'rish
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <Link to={`/examinations/${exam.id}/print`}>
                                <Printer className="mr-2 h-4 w-4" />
                                Chop etish
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="text-destructive"
                              onClick={() => deleteMutation.mutate(exam.id)}
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              O'chirish
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {/* Pagination */}
              {data && data.pages > 1 && (
                <div className="flex items-center justify-between px-2 py-4">
                  <p className="text-sm text-muted-foreground">
                    Jami: {data.total} ta tekshiruv
                  </p>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setPage(page - 1)}
                      disabled={page === 1}
                    >
                      Oldingi
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setPage(page + 1)}
                      disabled={page >= data.pages}
                    >
                      Keyingi
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
