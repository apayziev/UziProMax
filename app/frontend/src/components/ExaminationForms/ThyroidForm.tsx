/**
 * Qalqonsimon bez UZI formasi - Щитовидная железа
 * DRY: Umumiy tarjimalardan foydalanadi
 */
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { getThyroidTranslations, type Language } from "./translations"

interface ThyroidFormProps {
  data: Record<string, any>
  onChange: (data: Record<string, any>) => void
  language?: Language
}

export function ThyroidForm({ data, onChange, language = "ru" }: ThyroidFormProps) {
  const updateField = (field: string, value: any) => {
    onChange({ ...data, [field]: value })
  }

  const t = getThyroidTranslations(language)

  // Hajmni hisoblash (0.479 * uzunlik * kenglik * qalinlik)
  const calculateVolume = (length: number, width: number, thickness: number) => {
    if (length && width && thickness) {
      return (0.479 * length * width * thickness / 1000).toFixed(1)
    }
    return ""
  }

  const rightVolume = calculateVolume(parseFloat(data.right_length || "0"), parseFloat(data.right_width || "0"), parseFloat(data.right_thickness || "0"))
  const leftVolume = calculateVolume(parseFloat(data.left_length || "0"), parseFloat(data.left_width || "0"), parseFloat(data.left_thickness || "0"))
  const totalVolume = rightVolume && leftVolume ? (parseFloat(rightVolume) + parseFloat(leftVolume)).toFixed(1) : ""

  return (
    <div className="space-y-6">
      {/* O'NG BO'LAK */}
      <div>
        <h3 className="text-lg font-semibold mb-4">{t.rightLobe}</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="space-y-2">
            <Label>{t.length} ({t.mm})</Label>
            <Input type="number" placeholder="40-60" value={data.right_length || ""} onChange={(e) => updateField("right_length", e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>{t.width} ({t.mm})</Label>
            <Input type="number" placeholder="13-18" value={data.right_width || ""} onChange={(e) => updateField("right_width", e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>{t.thickness} ({t.mm})</Label>
            <Input type="number" placeholder="15-18" value={data.right_thickness || ""} onChange={(e) => updateField("right_thickness", e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>{t.volume} ({t.ml})</Label>
            <Input type="text" value={rightVolume} readOnly className="bg-muted" />
            <span className="text-xs text-muted-foreground">{t.auto}</span>
          </div>
          <div className="space-y-2">
            <Label>{t.contours}</Label>
            <Select value={data.right_contours || ""} onValueChange={(v) => updateField("right_contours", v)}>
              <SelectTrigger><SelectValue placeholder={t.select} /></SelectTrigger>
              <SelectContent>
                <SelectItem value="ровные, четкие">{t.smooth}</SelectItem>
                <SelectItem value="неровные">{t.uneven}</SelectItem>
                <SelectItem value="нечеткие">{t.unclear}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>{t.echogenicity}</Label>
            <Select value={data.right_echogenicity || ""} onValueChange={(v) => updateField("right_echogenicity", v)}>
              <SelectTrigger><SelectValue placeholder={t.select} /></SelectTrigger>
              <SelectContent>
                <SelectItem value="обычная">{t.normal}</SelectItem>
                <SelectItem value="повышена">{t.increased}</SelectItem>
                <SelectItem value="понижена">{t.decreased}</SelectItem>
                <SelectItem value="смешанная">{t.mixed}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>{t.structure}</Label>
            <Select value={data.right_structure || ""} onValueChange={(v) => updateField("right_structure", v)}>
              <SelectTrigger><SelectValue placeholder={t.select} /></SelectTrigger>
              <SelectContent>
                <SelectItem value="однородная">{t.homogeneous}</SelectItem>
                <SelectItem value="неоднородная">{t.heterogeneous}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>{t.nodules}</Label>
            <Select value={data.right_nodules || ""} onValueChange={(v) => updateField("right_nodules", v)}>
              <SelectTrigger><SelectValue placeholder={t.select} /></SelectTrigger>
              <SelectContent>
                <SelectItem value="нет">{t.none}</SelectItem>
                <SelectItem value="есть">{t.yes}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        {data.right_nodules === "есть" && (
          <div className="mt-4 p-4 border rounded-lg bg-muted/50">
            <h4 className="font-medium mb-3">{t.rightNodule}</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label>{t.size} ({t.mm})</Label>
                <Input placeholder={t.lengthWidthThickness} value={data.right_nodule_size || ""} onChange={(e) => updateField("right_nodule_size", e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>{t.echogenicity}</Label>
                <Select value={data.right_nodule_echo || ""} onValueChange={(v) => updateField("right_nodule_echo", v)}>
                  <SelectTrigger><SelectValue placeholder={t.select} /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="изоэхогенное">{t.isoechoic}</SelectItem>
                    <SelectItem value="гипоэхогенное">{t.hypoechoic}</SelectItem>
                    <SelectItem value="гиперэхогенное">{t.hyperechoic}</SelectItem>
                    <SelectItem value="анэхогенное">{t.anechoic}</SelectItem>
                    <SelectItem value="смешанное">{t.mixedEcho}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>{t.contours}</Label>
                <Select value={data.right_nodule_contours || ""} onValueChange={(v) => updateField("right_nodule_contours", v)}>
                  <SelectTrigger><SelectValue placeholder={t.select} /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ровные, четкие">{t.smooth}</SelectItem>
                    <SelectItem value="неровные">{t.uneven}</SelectItem>
                    <SelectItem value="нечеткие">{t.unclear}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>{t.structure}</Label>
                <Select value={data.right_nodule_structure || ""} onValueChange={(v) => updateField("right_nodule_structure", v)}>
                  <SelectTrigger><SelectValue placeholder={t.select} /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="однородная">{t.homogeneous}</SelectItem>
                    <SelectItem value="неоднородная">{t.heterogeneous}</SelectItem>
                    <SelectItem value="кистозная">{t.cystic}</SelectItem>
                    <SelectItem value="с кальцинатами">{t.withCalcifications}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        )}
      </div>

      <Separator />

      {/* CHAP BO'LAK */}
      <div>
        <h3 className="text-lg font-semibold mb-4">{t.leftLobe}</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="space-y-2">
            <Label>{t.length} ({t.mm})</Label>
            <Input type="number" placeholder="40-60" value={data.left_length || ""} onChange={(e) => updateField("left_length", e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>{t.width} ({t.mm})</Label>
            <Input type="number" placeholder="13-18" value={data.left_width || ""} onChange={(e) => updateField("left_width", e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>{t.thickness} ({t.mm})</Label>
            <Input type="number" placeholder="15-18" value={data.left_thickness || ""} onChange={(e) => updateField("left_thickness", e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>{t.volume} ({t.ml})</Label>
            <Input type="text" value={leftVolume} readOnly className="bg-muted" />
            <span className="text-xs text-muted-foreground">{t.auto}</span>
          </div>
          <div className="space-y-2">
            <Label>{t.contours}</Label>
            <Select value={data.left_contours || ""} onValueChange={(v) => updateField("left_contours", v)}>
              <SelectTrigger><SelectValue placeholder={t.select} /></SelectTrigger>
              <SelectContent>
                <SelectItem value="ровные, четкие">{t.smooth}</SelectItem>
                <SelectItem value="неровные">{t.uneven}</SelectItem>
                <SelectItem value="нечеткие">{t.unclear}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>{t.echogenicity}</Label>
            <Select value={data.left_echogenicity || ""} onValueChange={(v) => updateField("left_echogenicity", v)}>
              <SelectTrigger><SelectValue placeholder={t.select} /></SelectTrigger>
              <SelectContent>
                <SelectItem value="обычная">{t.normal}</SelectItem>
                <SelectItem value="повышена">{t.increased}</SelectItem>
                <SelectItem value="понижена">{t.decreased}</SelectItem>
                <SelectItem value="смешанная">{t.mixed}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>{t.structure}</Label>
            <Select value={data.left_structure || ""} onValueChange={(v) => updateField("left_structure", v)}>
              <SelectTrigger><SelectValue placeholder={t.select} /></SelectTrigger>
              <SelectContent>
                <SelectItem value="однородная">{t.homogeneous}</SelectItem>
                <SelectItem value="неоднородная">{t.heterogeneous}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>{t.nodules}</Label>
            <Select value={data.left_nodules || ""} onValueChange={(v) => updateField("left_nodules", v)}>
              <SelectTrigger><SelectValue placeholder={t.select} /></SelectTrigger>
              <SelectContent>
                <SelectItem value="нет">{t.none}</SelectItem>
                <SelectItem value="есть">{t.yes}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        {data.left_nodules === "есть" && (
          <div className="mt-4 p-4 border rounded-lg bg-muted/50">
            <h4 className="font-medium mb-3">{t.leftNodule}</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label>{t.size} ({t.mm})</Label>
                <Input placeholder={t.lengthWidthThickness} value={data.left_nodule_size || ""} onChange={(e) => updateField("left_nodule_size", e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>{t.echogenicity}</Label>
                <Select value={data.left_nodule_echo || ""} onValueChange={(v) => updateField("left_nodule_echo", v)}>
                  <SelectTrigger><SelectValue placeholder={t.select} /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="изоэхогенное">{t.isoechoic}</SelectItem>
                    <SelectItem value="гипоэхогенное">{t.hypoechoic}</SelectItem>
                    <SelectItem value="гиперэхогенное">{t.hyperechoic}</SelectItem>
                    <SelectItem value="анэхогенное">{t.anechoic}</SelectItem>
                    <SelectItem value="смешанное">{t.mixedEcho}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>{t.contours}</Label>
                <Select value={data.left_nodule_contours || ""} onValueChange={(v) => updateField("left_nodule_contours", v)}>
                  <SelectTrigger><SelectValue placeholder={t.select} /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ровные, четкие">{t.smooth}</SelectItem>
                    <SelectItem value="неровные">{t.uneven}</SelectItem>
                    <SelectItem value="нечеткие">{t.unclear}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>{t.structure}</Label>
                <Select value={data.left_nodule_structure || ""} onValueChange={(v) => updateField("left_nodule_structure", v)}>
                  <SelectTrigger><SelectValue placeholder={t.select} /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="однородная">{t.homogeneous}</SelectItem>
                    <SelectItem value="неоднородная">{t.heterogeneous}</SelectItem>
                    <SelectItem value="кистозная">{t.cystic}</SelectItem>
                    <SelectItem value="с кальцинатами">{t.withCalcifications}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        )}
      </div>

      <Separator />

      {/* BO'G'IN */}
      <div>
        <h3 className="text-lg font-semibold mb-4">{t.isthmus}</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="space-y-2">
            <Label>{t.thickness} ({t.mm})</Label>
            <Input type="number" placeholder={`${t.norm} 4-5`} value={data.isthmus_thickness || ""} onChange={(e) => updateField("isthmus_thickness", e.target.value)} />
            <span className="text-xs text-muted-foreground">{t.norm} 4-5</span>
          </div>
          <div className="space-y-2">
            <Label>{t.structure}</Label>
            <Select value={data.isthmus_structure || ""} onValueChange={(v) => updateField("isthmus_structure", v)}>
              <SelectTrigger><SelectValue placeholder={t.select} /></SelectTrigger>
              <SelectContent>
                <SelectItem value="однородная">{t.homogeneous}</SelectItem>
                <SelectItem value="неоднородная">{t.heterogeneous}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>{t.nodules}</Label>
            <Select value={data.isthmus_nodules || ""} onValueChange={(v) => updateField("isthmus_nodules", v)}>
              <SelectTrigger><SelectValue placeholder={t.select} /></SelectTrigger>
              <SelectContent>
                <SelectItem value="нет">{t.none}</SelectItem>
                <SelectItem value="есть">{t.yes}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <Separator />

      {/* UMUMIY HAJM VA LIMFA */}
      <div>
        <h3 className="text-lg font-semibold mb-4">{t.totalVolumeLymph}</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="space-y-2">
            <Label>{t.totalThyroidVolume} ({t.ml})</Label>
            <Input type="text" value={totalVolume} readOnly className="bg-muted" />
            <span className="text-xs text-muted-foreground">{t.normFemale}</span>
          </div>
          <div className="space-y-2">
            <Label>{t.regionalLymphNodes}</Label>
            <Select value={data.lymph_nodes || ""} onValueChange={(v) => updateField("lymph_nodes", v)}>
              <SelectTrigger><SelectValue placeholder={t.select} /></SelectTrigger>
              <SelectContent>
                <SelectItem value="не увеличены">{t.notEnlarged}</SelectItem>
                <SelectItem value="увеличены">{t.enlarged}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>{t.bloodFlow}</Label>
            <Select value={data.blood_flow || ""} onValueChange={(v) => updateField("blood_flow", v)}>
              <SelectTrigger><SelectValue placeholder={t.select} /></SelectTrigger>
              <SelectContent>
                <SelectItem value="обычный">{t.usual}</SelectItem>
                <SelectItem value="усилен">{t.intensified}</SelectItem>
                <SelectItem value="снижен">{t.reducedFlow}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <Separator />

      {/* TI-RADS */}
      <div>
        <h3 className="text-lg font-semibold mb-4">{t.tirads}</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>{t.tiradsIfNodules}</Label>
            <Select value={data.tirads || ""} onValueChange={(v) => updateField("tirads", v)}>
              <SelectTrigger><SelectValue placeholder={t.select} /></SelectTrigger>
              <SelectContent>
                <SelectItem value="1">{t.tirads1}</SelectItem>
                <SelectItem value="2">{t.tirads2}</SelectItem>
                <SelectItem value="3">{t.tirads3}</SelectItem>
                <SelectItem value="4a">{t.tirads4a}</SelectItem>
                <SelectItem value="4b">{t.tirads4b}</SelectItem>
                <SelectItem value="4c">{t.tirads4c}</SelectItem>
                <SelectItem value="5">{t.tirads5}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <Separator />

      {/* QOSHIMCHA */}
      <div>
        <h3 className="text-lg font-semibold mb-4">{t.additionalInfo}</h3>
        <div className="space-y-2">
          <Label>{t.notes}</Label>
          <Textarea placeholder={t.additionalObservations} value={data.notes || ""} onChange={(e) => updateField("notes", e.target.value)} />
        </div>
      </div>
    </div>
  )
}
