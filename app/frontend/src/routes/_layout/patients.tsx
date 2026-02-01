import { createFileRoute } from "@tanstack/react-router"
import { useState } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { Plus, Search, User, Phone, Calendar, MoreHorizontal, Edit, Trash2, FileText } from "lucide-react"
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
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
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { useLanguage } from "@/hooks/useLanguage"

import type { Patient, PatientCreate, PatientListResponse } from "@/types/medical"

export const Route = createFileRoute("/_layout/patients")({
  component: PatientsPage,
})

// API functions
async function fetchPatients(query: string, page: number): Promise<PatientListResponse> {
  const params = new URLSearchParams({ page: String(page), per_page: "20" })
  if (query) params.set("query", query)
  
  const response = await fetch(`/api/v1/patients?${params}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` },
  })
  if (!response.ok) throw new Error("Failed to fetch patients")
  return response.json()
}

async function createPatient(data: PatientCreate): Promise<Patient> {
  const response = await fetch("/api/v1/patients", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
    body: JSON.stringify(data),
  })
  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.detail || "Failed to create patient")
  }
  return response.json()
}

async function deletePatient(id: number): Promise<void> {
  const response = await fetch(`/api/v1/patients/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` },
  })
  if (!response.ok) throw new Error("Failed to delete patient")
}

function PatientsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [page, setPage] = useState(1)
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [newPatient, setNewPatient] = useState<PatientCreate>({
    full_name: "",
    gender: "female",
    phone: "",
    birth_date: "",
  })
  
  const { toast } = useToast()
  const queryClient = useQueryClient()
  const { t } = useLanguage()

  const { data, isLoading } = useQuery({
    queryKey: ["patients", searchQuery, page],
    queryFn: () => fetchPatients(searchQuery, page),
  })

  const createMutation = useMutation({
    mutationFn: createPatient,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["patients"] })
      setIsCreateOpen(false)
      setNewPatient({ full_name: "", gender: "female", phone: "", birth_date: "" })
      toast({ title: t("success"), description: t("patient_added") })
    },
    onError: (error: Error) => {
      toast({ title: t("error"), description: error.message, variant: "destructive" })
    },
  })

  const deleteMutation = useMutation({
    mutationFn: deletePatient,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["patients"] })
      toast({ title: t("deleted"), description: t("patient_deleted") })
    },
  })

  const handleCreate = () => {
    if (!newPatient.full_name.trim()) {
      toast({ title: t("error"), description: t("name_required"), variant: "destructive" })
      return
    }
    createMutation.mutate(newPatient)
  }

  const formatDate = (date: string | null) => {
    if (!date) return "-"
    return new Date(date).toLocaleDateString("uz-UZ")
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{t("patients")}</h1>
          <p className="text-muted-foreground">{t("all_patients_list")}</p>
        </div>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              {t("add_patient")}
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>{t("add_new_patient")}</DialogTitle>
              <DialogDescription>
                {t("enter_patient_info")}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="full_name">{t("full_name")} *</Label>
                <Input
                  id="full_name"
                  placeholder="Ivanov Ivan Ivanovich"
                  value={newPatient.full_name}
                  onChange={(e) => setNewPatient({ ...newPatient, full_name: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="gender">{t("gender")}</Label>
                  <Select
                    value={newPatient.gender}
                    onValueChange={(value: "male" | "female") => 
                      setNewPatient({ ...newPatient, gender: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={t("select")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="female">{t("female")}</SelectItem>
                      <SelectItem value="male">{t("male")}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="birth_date">{t("birth_date")}</Label>
                  <Input
                    id="birth_date"
                    type="date"
                    value={newPatient.birth_date || ""}
                    onChange={(e) => setNewPatient({ ...newPatient, birth_date: e.target.value || null })}
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone">{t("phone_number")}</Label>
                <Input
                  id="phone"
                  placeholder="+998 90 123 45 67"
                  value={newPatient.phone || ""}
                  onChange={(e) => setNewPatient({ ...newPatient, phone: e.target.value })}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateOpen(false)}>
                {t("cancel")}
              </Button>
              <Button onClick={handleCreate} disabled={createMutation.isPending}>
                {createMutation.isPending ? t("saving") : t("save")}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder={t("search_by_name_phone")}
                className="pl-10"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value)
                  setPage(1)
                }}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardContent className="pt-6">
          {isLoading ? (
            <div className="flex items-center justify-center py-10">
              <div className="text-muted-foreground">{t("loading")}</div>
            </div>
          ) : data?.items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10">
              <User className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground">{t("no_patients")}</p>
            </div>
          ) : (
            <>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t("name")}</TableHead>
                    <TableHead>{t("gender")}</TableHead>
                    <TableHead>{t("birth_date")}</TableHead>
                    <TableHead>{t("phone_number")}</TableHead>
                    <TableHead>{t("examinations")}</TableHead>
                    <TableHead>{t("registered")}</TableHead>
                    <TableHead className="w-[70px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data?.items.map((patient) => (
                    <TableRow key={patient.id}>
                      <TableCell className="font-medium">{patient.full_name}</TableCell>
                      <TableCell>
                        <Badge variant={patient.gender === "female" ? "default" : "secondary"}>
                          {patient.gender === "female" ? t("female") : t("male")}
                        </Badge>
                      </TableCell>
                      <TableCell>{formatDate(patient.birth_date)}</TableCell>
                      <TableCell>{patient.phone || "-"}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{patient.examination_count || 0}</Badge>
                      </TableCell>
                      <TableCell>{formatDate(patient.created_at)}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem asChild>
                              <Link to={`/examinations/new?patient_id=${patient.id}`}>
                                <FileText className="mr-2 h-4 w-4" />
                                {t("new_examination")}
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <Link to={`/patients/${patient.id}`}>
                                <Edit className="mr-2 h-4 w-4" />
                                {t("edit")}
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="text-destructive"
                              onClick={() => deleteMutation.mutate(patient.id)}
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
                    {t("total")}: {data.total} {t("patients_count")}
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
