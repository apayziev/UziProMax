import { createFileRoute } from "@tanstack/react-router"
import { useState } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { FileText, Calendar, MoreHorizontal, Eye, Printer, Trash2 } from "lucide-react"
import { Link } from "@tanstack/react-router"

import { Button } from "@/components/ui/button"
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
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { useLanguage } from "@/hooks/useLanguage"

import { TEMPLATE_TYPES, type ExaminationListResponse } from "@/types/medical"

export const Route = createFileRoute("/_layout/examinations/")({
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
  const { t, language } = useLanguage()

  const { data, isLoading } = useQuery({
    queryKey: ["examinations", page, templateFilter, statusFilter],
    queryFn: () => fetchExaminations(page, templateFilter, statusFilter),
  })

  const deleteMutation = useMutation({
    mutationFn: deleteExamination,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["examinations"] })
      toast({ title: t("deleted"), description: t("examination_deleted") })
    },
  })

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString(language === "ru" ? "ru-RU" : "uz-UZ")
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "draft":
        return <Badge variant="secondary">{t("draft")}</Badge>
      case "completed":
        return <Badge variant="default">{t("completed")}</Badge>
      case "printed":
        return <Badge variant="outline">{t("printed")}</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{t("examinations")}</h1>
          <p className="text-muted-foreground">{t("all_examinations_list")}</p>
        </div>
        <Link to="/examinations/new">
          <Button>
            <FileText className="mr-2 h-4 w-4" />
            {t("new_examination")}
          </Button>
        </Link>
      </div>

      {/* Template Type Tabs */}
      <div className="flex flex-wrap gap-2">
        <Button
          variant={templateFilter === "all" ? "default" : "outline"}
          size="sm"
          onClick={() => { setTemplateFilter("all"); setPage(1) }}
        >
          {t("all")}
        </Button>
        {Object.entries(TEMPLATE_TYPES).map(([key, value]) => (
          <Button
            key={key}
            variant={templateFilter === key ? "default" : "outline"}
            size="sm"
            onClick={() => { setTemplateFilter(key); setPage(1) }}
          >
            {language === "ru" ? value.name_ru : value.name}
          </Button>
        ))}
      </div>

      {/* Status Filter */}
      <div className="flex gap-2">
        <Badge 
          variant={statusFilter === "all" ? "default" : "outline"} 
          className="cursor-pointer px-3 py-1"
          onClick={() => { setStatusFilter("all"); setPage(1) }}
        >
          {t("all")}
        </Badge>
        <Badge 
          variant={statusFilter === "draft" ? "secondary" : "outline"} 
          className="cursor-pointer px-3 py-1"
          onClick={() => { setStatusFilter("draft"); setPage(1) }}
        >
          {t("draft")}
        </Badge>
        <Badge 
          variant={statusFilter === "completed" ? "default" : "outline"} 
          className="cursor-pointer px-3 py-1"
          onClick={() => { setStatusFilter("completed"); setPage(1) }}
        >
          {t("completed")}
        </Badge>
        <Badge 
          variant={statusFilter === "printed" ? "outline" : "outline"} 
          className={`cursor-pointer px-3 py-1 ${statusFilter === "printed" ? "bg-muted" : ""}`}
          onClick={() => { setStatusFilter("printed"); setPage(1) }}
        >
          {t("printed")}
        </Badge>
      </div>

      {/* Table */}
      <Card>
        <CardContent className="pt-6">
          {isLoading ? (
            <div className="flex items-center justify-center py-10">
              <div className="text-muted-foreground">{t("loading")}</div>
            </div>
          ) : data?.items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10">
              <FileText className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground">{t("no_examinations")}</p>
            </div>
          ) : (
            <>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t("date")}</TableHead>
                    <TableHead>{t("patient")}</TableHead>
                    <TableHead>{t("examination_type")}</TableHead>
                    <TableHead>{t("status")}</TableHead>
                    <TableHead>{t("created")}</TableHead>
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
                          {TEMPLATE_TYPES[exam.template_type]?.[language === "ru" ? "name_ru" : "name_uz"] || exam.template_type}
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
                                {t("view")}
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <Link to={`/examinations/${exam.id}/print`}>
                                <Printer className="mr-2 h-4 w-4" />
                                {t("print")}
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="text-destructive"
                              onClick={() => deleteMutation.mutate(exam.id)}
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              {t("delete")}
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
                    {t("total")}: {data.total} {t("examinations_count")}
                  </p>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setPage(page - 1)}
                      disabled={page === 1}
                    >
                      {t("previous")}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setPage(page + 1)}
                      disabled={page >= data.pages}
                    >
                      {t("next")}
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
