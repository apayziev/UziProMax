/**
 * MSW Mock API Handlers
 * Backend yo'q bo'lganda frontend test qilish uchun
 */
import { HttpResponse, http } from "msw"

// Test ma'lumotlari
const mockUsers = [
  {
    id: "1",
    phone_number: "+998901234567",
    first_name: "Малика",
    last_name: "Атамурадова",
    middle_name: "Азизовна",
    username: "malika",
    phone: "+998901234567",
    profile_image_url: "",
    is_active: true,
    is_superuser: true,
    role: "admin",
    language: "ru",
  },
]

const mockPatients = [
  {
    id: 1,
    last_name: "Иванова",
    first_name: "Мария",
    middle_name: "Петровна",
    gender: "female",
    birth_date: "1985-05-15",
    phone: "+998901234567",
    address: "г. Ташкент, ул. Навои 25",
    examination_count: 1,
    created_at: "2024-01-15T10:00:00Z",
  },
  {
    id: 2,
    last_name: "Петров",
    first_name: "Александр",
    middle_name: "Иванович",
    gender: "male",
    birth_date: "1978-11-22",
    phone: "+998907654321",
    address: "г. Самарканд, ул. Регистан 10",
    examination_count: 1,
    created_at: "2024-01-16T14:30:00Z",
  },
  {
    id: 3,
    last_name: "Сидорова",
    first_name: "Елена",
    middle_name: "Васильевна",
    gender: "female",
    birth_date: "1990-03-08",
    phone: "+998933334455",
    address: "г. Бухара, ул. Ибн Сино 5",
    examination_count: 1,
    created_at: "2024-01-17T09:15:00Z",
  },
]

const mockExaminations = [
  {
    id: 1,
    patient_id: 1,
    patient_name: "Иванова Мария Петровна",
    patient: {
      id: 1,
      last_name: "Иванова",
      first_name: "Мария",
      middle_name: "Петровна",
      birth_date: "1985-05-15",
      phone: "+998901234567",
    },
    template_type: "gynecology_uterus",
    examination_date: "2024-01-20",
    status: "completed",
    conclusion: "Эхопризнаки нормы органов малого таза.",
    recommendations: "Контрольное УЗИ через 6 месяцев.",
    doctor_name: "Атамурадова М.А.",
    examination_data: {
      uterus_position: "anteflexio",
      uterus_length: "56",
      uterus_width: "48.5",
      uterus_thickness: "55.4",
      uterus_contour: "ровные, четкие",
      myometrium_structure: "однородная",
      endometrium_thickness: "10.5",
      menstrual_phase: "пролиферативная",
    },
    created_at: "2024-01-20T11:00:00Z",
  },
  {
    id: 2,
    patient_id: 2,
    patient_name: "Петров Александр Иванович",
    patient: {
      id: 2,
      last_name: "Петров",
      first_name: "Александр",
      middle_name: "Иванович",
      birth_date: "1978-11-22",
      phone: "+998907654321",
    },
    template_type: "abdominal",
    examination_date: "2024-01-21",
    status: "draft",
    conclusion: "",
    recommendations: "",
    doctor_name: "Атамурадова М.А.",
    examination_data: {
      liver_kvr_right: "145",
      liver_left_length: "65",
      liver_echogenicity: "средняя",
    },
    created_at: "2024-01-21T15:30:00Z",
  },
  {
    id: 3,
    patient_id: 3,
    patient_name: "Сидорова Елена Васильевна",
    patient: {
      id: 3,
      last_name: "Сидорова",
      first_name: "Елена",
      middle_name: "Васильевна",
      birth_date: "1990-03-08",
      phone: "+998933334455",
    },
    template_type: "gynecology_cyst",
    examination_date: "2024-01-22",
    status: "completed",
    conclusion:
      "Кистозное образование в правом придатке O-RADS 2-3. Фолликулярная киста справа, киста желтого тела слева.",
    recommendations: "Консультация гинеколога. Контрольное УЗИ через 10 дней.",
    doctor_name: "Атамурадова М.А.",
    examination_data: {
      right_cyst_type: "фолликулярная киста",
      right_cyst_size: "56.7x45.3",
      right_cyst_contours: "ровные, четкие",
      right_cyst_content: "однородное",
      left_cyst_type: "киста желтого тела",
      left_cyst_size: "51.2x48.2x50.4",
      left_cyst_content: "с кровоизлиянием",
      cyst_orads: "O-RADS 2-3",
    },
    created_at: "2024-01-22T10:00:00Z",
  },
]

// Token yaratish
const generateToken = () => `mock_access_token_${Date.now()}`

export const handlers = [
  // ==================== AUTH ====================
  http.post("/api/v1/login/access-token", async ({ request }) => {
    const formData = await request.formData()
    const username = formData.get("username")?.toString() || ""
    const password = formData.get("password")?.toString() || ""

    console.log("🔐 Login attempt:", { username, password })

    // Test credentials (telefon raqam turli formatda bo'lishi mumkin)
    const validPhones = ["+998901234567", "998901234567", "901234567"]
    const isValidPhone = validPhones.some(
      (p) =>
        username.includes(p.replace(/\D/g, "")) ||
        p.includes(username.replace(/\D/g, "")),
    )

    if (isValidPhone && password === "test123") {
      console.log("✅ Login successful")
      return HttpResponse.json({
        access_token: generateToken(),
        token_type: "bearer",
      })
    }

    console.log("❌ Login failed")
    return new HttpResponse(
      JSON.stringify({ detail: "Noto'g'ri telefon raqam yoki parol" }),
      { status: 401 },
    )
  }),

  // ==================== USERS ====================
  http.get("/api/v1/users/me", () => {
    return HttpResponse.json(mockUsers[0])
  }),

  http.get("/api/v1/users", () => {
    return HttpResponse.json({
      data: mockUsers,
      count: mockUsers.length,
    })
  }),

  http.patch("/api/v1/users/me", async ({ request }) => {
    const data = (await request.json()) as Record<string, unknown>
    return HttpResponse.json({ ...mockUsers[0], ...data })
  }),

  http.patch("/api/v1/users/me/password", () => {
    return HttpResponse.json({ message: "Password updated" })
  }),

  // ==================== PATIENTS ====================
  http.get("/api/v1/patients", ({ request }) => {
    const url = new URL(request.url)
    const search = url.searchParams.get("search")?.toLowerCase()

    let filtered = [...mockPatients]
    if (search) {
      filtered = mockPatients.filter(
        (p) =>
          `${p.last_name} ${p.first_name} ${p.middle_name}`
            .toLowerCase()
            .includes(search) || p.phone.includes(search),
      )
    }

    return HttpResponse.json({
      items: filtered,
      count: filtered.length,
    })
  }),

  http.get("/api/v1/patients/:id", ({ params }) => {
    const patient = mockPatients.find((p) => p.id === Number(params.id))
    if (!patient) {
      return new HttpResponse(null, { status: 404 })
    }
    return HttpResponse.json(patient)
  }),

  http.post("/api/v1/patients", async ({ request }) => {
    const data = (await request.json()) as Record<string, unknown>
    const newPatient = {
      id: mockPatients.length + 1,
      ...data,
      created_at: new Date().toISOString(),
    }
    mockPatients.push(newPatient as (typeof mockPatients)[0])
    return HttpResponse.json(newPatient, { status: 201 })
  }),

  http.put("/api/v1/patients/:id", async ({ params, request }) => {
    const data = (await request.json()) as Record<string, unknown>
    const index = mockPatients.findIndex((p) => p.id === Number(params.id))
    if (index === -1) {
      return new HttpResponse(null, { status: 404 })
    }
    mockPatients[index] = { ...mockPatients[index], ...data }
    return HttpResponse.json(mockPatients[index])
  }),

  http.delete("/api/v1/patients/:id", ({ params }) => {
    const index = mockPatients.findIndex((p) => p.id === Number(params.id))
    if (index === -1) {
      return new HttpResponse(null, { status: 404 })
    }
    mockPatients.splice(index, 1)
    return new HttpResponse(null, { status: 204 })
  }),

  // ==================== EXAMINATIONS ====================
  http.get("/api/v1/examinations", ({ request }) => {
    const url = new URL(request.url)
    const patientId = url.searchParams.get("patient_id")
    const status = url.searchParams.get("status")

    let filtered = [...mockExaminations]
    if (patientId) {
      filtered = filtered.filter((e) => e.patient_id === Number(patientId))
    }
    if (status) {
      filtered = filtered.filter((e) => e.status === status)
    }

    return HttpResponse.json({
      items: filtered,
      count: filtered.length,
    })
  }),

  http.get("/api/v1/examinations/:id", ({ params }) => {
    const exam = mockExaminations.find((e) => e.id === Number(params.id))
    if (!exam) {
      return new HttpResponse(null, { status: 404 })
    }
    return HttpResponse.json(exam)
  }),

  http.post("/api/v1/examinations", async ({ request }) => {
    const data = (await request.json()) as Record<string, unknown>
    const patient = mockPatients.find((p) => p.id === data.patient_id)
    const patientName = patient
      ? `${patient.last_name} ${patient.first_name} ${patient.middle_name}`
      : "Unknown"
    const newExam = {
      id: mockExaminations.length + 1,
      ...data,
      patient_name: patientName,
      status: "draft",
      created_at: new Date().toISOString(),
    }
    mockExaminations.push(newExam as (typeof mockExaminations)[0])
    return HttpResponse.json(newExam, { status: 201 })
  }),

  http.put("/api/v1/examinations/:id", async ({ params, request }) => {
    const data = (await request.json()) as Record<string, unknown>
    const index = mockExaminations.findIndex((e) => e.id === Number(params.id))
    if (index === -1) {
      return new HttpResponse(null, { status: 404 })
    }
    mockExaminations[index] = { ...mockExaminations[index], ...data }
    return HttpResponse.json(mockExaminations[index])
  }),

  http.delete("/api/v1/examinations/:id", ({ params }) => {
    const index = mockExaminations.findIndex((e) => e.id === Number(params.id))
    if (index === -1) {
      return new HttpResponse(null, { status: 404 })
    }
    mockExaminations.splice(index, 1)
    return new HttpResponse(null, { status: 204 })
  }),

  // ==================== HEALTH ====================
  http.get("/api/v1/health", () => {
    return HttpResponse.json({ status: "healthy", mock: true })
  }),
]
