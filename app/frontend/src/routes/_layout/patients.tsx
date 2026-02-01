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
import { Label } from "@/components/ui/label"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Badge } from "@/components/ui/badge"
import { DatePicker } from "@/components/ui/date-picker"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { useLanguage } from "@/hooks/useLanguage"

import type { Patient, PatientCreate, PatientUpdate, PatientListResponse } from "@/types/medical"

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

async function updatePatient({ id, data }: { id: number; data: PatientUpdate }): Promise<Patient> {
  const response = await fetch(`/api/v1/patients/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
    body: JSON.stringify(data),
  })
  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.detail || "Failed to update patient")
  }
  return response.json()
}

function PatientsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [page, setPage] = useState(1)
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [editingPatient, setEditingPatient] = useState<Patient | null>(null)
  const [newPatient, setNewPatient] = useState<PatientCreate>({
    last_name: "",
    first_name: "",
    middle_name: "",
    gender: "female",
    phone: "+998",
    birth_date: "",
  })
  
  const { toast } = useToast()
  const queryClient = useQueryClient()
  const { t, language } = useLanguage()

  const { data, isLoading } = useQuery({
    queryKey: ["patients", searchQuery, page],
    queryFn: () => fetchPatients(searchQuery, page),
  })

  const createMutation = useMutation({
    mutationFn: createPatient,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["patients"] })
      setIsCreateOpen(false)
      setNewPatient({ 
        last_name: "",
        first_name: "",
        middle_name: "",
        gender: "female", 
        phone: "+998", 
        birth_date: "",
      })
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

  const updateMutation = useMutation({
    mutationFn: updatePatient,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["patients"] })
      setIsEditOpen(false)
      setEditingPatient(null)
      toast({ title: t("success"), description: language === "ru" ? "Пациент обновлен" : "Bemor yangilandi" })
    },
    onError: (error: Error) => {
      toast({ title: t("error"), description: error.message, variant: "destructive" })
    },
  })

  const handleEdit = (patient: Patient) => {
    setEditingPatient(patient)
    setIsEditOpen(true)
  }

  const handleUpdate = () => {
    if (!editingPatient) return
    
    if (!editingPatient.last_name?.trim() || !editingPatient.first_name?.trim()) {
      toast({ 
        title: t("error"), 
        description: language === "ru" ? "Введите имя и фамилию" : "Ism va familiyani kiriting", 
        variant: "destructive" 
      })
      return
    }
    updateMutation.mutate({
      id: editingPatient.id,
      data: {
        last_name: editingPatient.last_name,
        first_name: editingPatient.first_name,
        middle_name: editingPatient.middle_name,
        gender: editingPatient.gender,
        birth_date: editingPatient.birth_date,
        phone: editingPatient.phone === "+998" ? null : editingPatient.phone,
      },
    })
  }

  const handleCreate = () => {
    if (!newPatient.last_name?.trim() || !newPatient.first_name?.trim()) {
      toast({ 
        title: t("error"), 
        description: language === "ru" ? "Введите имя и фамилию" : "Ism va familiyani kiriting", 
        variant: "destructive" 
      })
      return
    }
    createMutation.mutate({
      ...newPatient,
      phone: newPatient.phone === "+998" ? "" : newPatient.phone,
    })
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
          <DialogContent className="sm:max-w-[550px]">
            <DialogHeader>
              <DialogTitle>{language === "ru" ? "Новый пациент" : "Yangi bemor"}</DialogTitle>
              <DialogDescription>
                {language === "ru" ? "Введите данные пациента" : "Bemor ma'lumotlarini kiriting"}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label>{language === "ru" ? "Фамилия *" : "Familiya *"}</Label>
                  <Input
                    placeholder={language === "ru" ? "Иванов" : "Aliyev"}
                    value={newPatient.last_name || ""}
                    onChange={(e) => setNewPatient({ ...newPatient, last_name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>{language === "ru" ? "Имя *" : "Ism *"}</Label>
                  <Input
                    placeholder={language === "ru" ? "Иван" : "Ali"}
                    value={newPatient.first_name || ""}
                    onChange={(e) => setNewPatient({ ...newPatient, first_name: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>{language === "ru" ? "Отчество" : "Sharifi"}</Label>
                <Input
                  placeholder={language === "ru" ? "Иванович" : "Valiyevich"}
                  value={newPatient.middle_name || ""}
                  onChange={(e) => setNewPatient({ ...newPatient, middle_name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>{language === "ru" ? "Телефон *" : "Telefon *"}</Label>
                <Input
                  placeholder="+998 90 123 45 67"
                  value={newPatient.phone || "+998"}
                  onChange={(e) => {
                    let value = e.target.value.replace(/[^\d+]/g, "")
                    if (!value.startsWith("+998")) {
                      value = "+998"
                    }
                    if (value.length > 13) value = value.slice(0, 13)
                    setNewPatient({ ...newPatient, phone: value })
                  }}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>{language === "ru" ? "Пол" : "Jinsi"}</Label>
                  <ToggleGroup
                    type="single"
                    value={newPatient.gender}
                    onValueChange={(value: "male" | "female") => {
                      if (value) setNewPatient({ ...newPatient, gender: value })
                    }}
                    variant="outline"
                    className="w-full"
                  >
                    <ToggleGroupItem 
                      value="female" 
                      className="flex-1 data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
                    >
                      {language === "ru" ? "Женский" : "Ayol"}
                    </ToggleGroupItem>
                    <ToggleGroupItem 
                      value="male" 
                      className="flex-1 data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
                    >
                      {language === "ru" ? "Мужской" : "Erkak"}
                    </ToggleGroupItem>
                  </ToggleGroup>
                </div>
                <div className="space-y-2">
                  <Label>
                    {language === "ru" ? "Дата рождения" : "Tug'ilgan sana"}
                    {newPatient.birth_date && (
                      <span className="text-foreground font-medium ml-1">
                        ({(() => {
                          const today = new Date()
                          const birth = new Date(newPatient.birth_date)
                          let age = today.getFullYear() - birth.getFullYear()
                          const m = today.getMonth() - birth.getMonth()
                          if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--
                          return age
                        })()} {language === "ru" ? "лет" : "yosh"})
                      </span>
                    )}
                  </Label>
                  <DatePicker
                    value={newPatient.birth_date}
                    onChange={(date) => setNewPatient({ 
                      ...newPatient, 
                      birth_date: date 
                        ? `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
                        : null 
                    })}
                    language={language as "uz" | "ru"}
                  />
                </div>
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
                      <TableCell className="font-medium">
                        {patient.last_name} {patient.first_name}{patient.middle_name ? ` ${patient.middle_name}` : ''}
                      </TableCell>
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
                            <DropdownMenuItem onClick={() => handleEdit(patient)}>
                              <Edit className="mr-2 h-4 w-4" />
                              {t("edit")}
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

      {/* Edit Patient Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>{language === "ru" ? "Редактировать пациента" : "Bemorni tahrirlash"}</DialogTitle>
            <DialogDescription>
              {language === "ru" ? "Измените данные пациента" : "Bemor ma'lumotlarini o'zgartiring"}
            </DialogDescription>
          </DialogHeader>
          {editingPatient && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label>{language === "ru" ? "Фамилия *" : "Familiya *"}</Label>
                  <Input
                    placeholder={language === "ru" ? "Иванов" : "Aliyev"}
                    value={editingPatient.last_name || ""}
                    onChange={(e) => setEditingPatient({ ...editingPatient, last_name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>{language === "ru" ? "Имя *" : "Ism *"}</Label>
                  <Input
                    placeholder={language === "ru" ? "Иван" : "Ali"}
                    value={editingPatient.first_name || ""}
                    onChange={(e) => setEditingPatient({ ...editingPatient, first_name: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>{language === "ru" ? "Отчество" : "Sharifi"}</Label>
                <Input
                  placeholder={language === "ru" ? "Иванович" : "Valiyevich"}
                  value={editingPatient.middle_name || ""}
                  onChange={(e) => setEditingPatient({ ...editingPatient, middle_name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>{language === "ru" ? "Телефон" : "Telefon"}</Label>
                <Input
                  placeholder="+998 90 123 45 67"
                  value={editingPatient.phone || "+998"}
                  onChange={(e) => {
                    let value = e.target.value.replace(/[^\d+]/g, "")
                    if (!value.startsWith("+998")) {
                      value = "+998"
                    }
                    if (value.length > 13) value = value.slice(0, 13)
                    setEditingPatient({ ...editingPatient, phone: value === "+998" ? "" : value })
                  }}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>{language === "ru" ? "Пол" : "Jinsi"}</Label>
                  <ToggleGroup
                    type="single"
                    value={editingPatient.gender}
                    onValueChange={(value: "male" | "female") => {
                      if (value) setEditingPatient({ ...editingPatient, gender: value })
                    }}
                    variant="outline"
                    className="w-full"
                  >
                    <ToggleGroupItem 
                      value="female" 
                      className="flex-1 data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
                    >
                      {language === "ru" ? "Женский" : "Ayol"}
                    </ToggleGroupItem>
                    <ToggleGroupItem 
                      value="male" 
                      className="flex-1 data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
                    >
                      {language === "ru" ? "Мужской" : "Erkak"}
                    </ToggleGroupItem>
                  </ToggleGroup>
                </div>
                <div className="space-y-2">
                  <Label>
                    {language === "ru" ? "Дата рождения" : "Tug'ilgan sana"}
                    {editingPatient.birth_date && (
                      <span className="text-foreground font-medium ml-1">
                        ({(() => {
                          const today = new Date()
                          const birth = new Date(editingPatient.birth_date)
                          let age = today.getFullYear() - birth.getFullYear()
                          const m = today.getMonth() - birth.getMonth()
                          if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--
                          return age
                        })()} {language === "ru" ? "лет" : "yosh"})
                      </span>
                    )}
                  </Label>
                  <DatePicker
                    value={editingPatient.birth_date}
                    onChange={(date) => setEditingPatient({ 
                      ...editingPatient, 
                      birth_date: date 
                        ? `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
                        : null 
                    })}
                    language={language as "uz" | "ru"}
                  />
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditOpen(false)}>
              {t("cancel")}
            </Button>
            <Button onClick={handleUpdate} disabled={updateMutation.isPending}>
              {updateMutation.isPending ? t("saving") : t("save")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
