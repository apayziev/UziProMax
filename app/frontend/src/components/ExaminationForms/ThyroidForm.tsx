/**
 * Qalqonsimon bez UZI formasi - Щитовидная железа
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

interface ThyroidFormProps {
  data: Record<string, any>
  onChange: (data: Record<string, any>) => void
}

export function ThyroidForm({ data, onChange }: ThyroidFormProps) {
  const updateField = (field: string, value: any) => {
    onChange({ ...data, [field]: value })
  }

  // Hajmni hisoblash (0.479 * uzunlik * kenglik * qalinlik)
  const calculateVolume = (length: number, width: number, thickness: number) => {
    if (length && width && thickness) {
      return (0.479 * length * width * thickness / 1000).toFixed(1)
    }
    return ""
  }

  // O'ng bo'lak hajmi
  const rightVolume = calculateVolume(
    parseFloat(data.right_length || "0"),
    parseFloat(data.right_width || "0"),
    parseFloat(data.right_thickness || "0")
  )

  // Chap bo'lak hajmi
  const leftVolume = calculateVolume(
    parseFloat(data.left_length || "0"),
    parseFloat(data.left_width || "0"),
    parseFloat(data.left_thickness || "0")
  )

  // Umumiy hajm
  const totalVolume = rightVolume && leftVolume
    ? (parseFloat(rightVolume) + parseFloat(leftVolume)).toFixed(1)
    : ""

  return (
    <div className="space-y-6">
      {/* O'NG BO'LAK */}
      <div>
        <h3 className="text-lg font-semibold mb-4">ПРАВАЯ ДОЛЯ</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="space-y-2">
            <Label>Длина (мм)</Label>
            <Input
              type="number"
              placeholder="40-60"
              value={data.right_length || ""}
              onChange={(e) => updateField("right_length", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Ширина (мм)</Label>
            <Input
              type="number"
              placeholder="13-18"
              value={data.right_width || ""}
              onChange={(e) => updateField("right_width", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Толщина (мм)</Label>
            <Input
              type="number"
              placeholder="15-18"
              value={data.right_thickness || ""}
              onChange={(e) => updateField("right_thickness", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Объем (мл)</Label>
            <Input
              type="text"
              value={rightVolume}
              readOnly
              className="bg-muted"
            />
            <span className="text-xs text-muted-foreground">автоматически</span>
          </div>
          <div className="space-y-2">
            <Label>Контуры</Label>
            <Select
              value={data.right_contours || ""}
              onValueChange={(v) => updateField("right_contours", v)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Tanlang" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ровные, четкие">ровные, четкие</SelectItem>
                <SelectItem value="неровные">неровные</SelectItem>
                <SelectItem value="нечеткие">нечеткие</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Эхогенность</Label>
            <Select
              value={data.right_echogenicity || ""}
              onValueChange={(v) => updateField("right_echogenicity", v)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Tanlang" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="обычная">обычная</SelectItem>
                <SelectItem value="повышена">повышена</SelectItem>
                <SelectItem value="понижена">понижена</SelectItem>
                <SelectItem value="смешанная">смешанная</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Структура</Label>
            <Select
              value={data.right_structure || ""}
              onValueChange={(v) => updateField("right_structure", v)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Tanlang" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="однородная">однородная</SelectItem>
                <SelectItem value="неоднородная">неоднородная</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Узлы</Label>
            <Select
              value={data.right_nodules || ""}
              onValueChange={(v) => updateField("right_nodules", v)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Tanlang" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="нет">нет</SelectItem>
                <SelectItem value="есть">есть</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        {data.right_nodules === "есть" && (
          <div className="mt-4 p-4 border rounded-lg bg-muted/50">
            <h4 className="font-medium mb-3">Узловое образование правой доли</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label>Размер (мм)</Label>
                <Input
                  placeholder="длина x ширина x толщина"
                  value={data.right_nodule_size || ""}
                  onChange={(e) => updateField("right_nodule_size", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Эхогенность</Label>
                <Select
                  value={data.right_nodule_echo || ""}
                  onValueChange={(v) => updateField("right_nodule_echo", v)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Tanlang" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="изоэхогенное">изоэхогенное</SelectItem>
                    <SelectItem value="гипоэхогенное">гипоэхогенное</SelectItem>
                    <SelectItem value="гиперэхогенное">гиперэхогенное</SelectItem>
                    <SelectItem value="анэхогенное">анэхогенное</SelectItem>
                    <SelectItem value="смешанное">смешанное</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Контуры</Label>
                <Select
                  value={data.right_nodule_contours || ""}
                  onValueChange={(v) => updateField("right_nodule_contours", v)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Tanlang" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ровные, четкие">ровные, четкие</SelectItem>
                    <SelectItem value="неровные">неровные</SelectItem>
                    <SelectItem value="нечеткие">нечеткие</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Структура</Label>
                <Select
                  value={data.right_nodule_structure || ""}
                  onValueChange={(v) => updateField("right_nodule_structure", v)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Tanlang" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="однородная">однородная</SelectItem>
                    <SelectItem value="неоднородная">неоднородная</SelectItem>
                    <SelectItem value="кистозная">кистозная</SelectItem>
                    <SelectItem value="с кальцинатами">с кальцинатами</SelectItem>
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
        <h3 className="text-lg font-semibold mb-4">ЛЕВАЯ ДОЛЯ</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="space-y-2">
            <Label>Длина (мм)</Label>
            <Input
              type="number"
              placeholder="40-60"
              value={data.left_length || ""}
              onChange={(e) => updateField("left_length", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Ширина (мм)</Label>
            <Input
              type="number"
              placeholder="13-18"
              value={data.left_width || ""}
              onChange={(e) => updateField("left_width", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Толщина (мм)</Label>
            <Input
              type="number"
              placeholder="15-18"
              value={data.left_thickness || ""}
              onChange={(e) => updateField("left_thickness", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Объем (мл)</Label>
            <Input
              type="text"
              value={leftVolume}
              readOnly
              className="bg-muted"
            />
            <span className="text-xs text-muted-foreground">автоматически</span>
          </div>
          <div className="space-y-2">
            <Label>Контуры</Label>
            <Select
              value={data.left_contours || ""}
              onValueChange={(v) => updateField("left_contours", v)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Tanlang" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ровные, четкие">ровные, четкие</SelectItem>
                <SelectItem value="неровные">неровные</SelectItem>
                <SelectItem value="нечеткие">нечеткие</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Эхогенность</Label>
            <Select
              value={data.left_echogenicity || ""}
              onValueChange={(v) => updateField("left_echogenicity", v)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Tanlang" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="обычная">обычная</SelectItem>
                <SelectItem value="повышена">повышена</SelectItem>
                <SelectItem value="понижена">понижена</SelectItem>
                <SelectItem value="смешанная">смешанная</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Структура</Label>
            <Select
              value={data.left_structure || ""}
              onValueChange={(v) => updateField("left_structure", v)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Tanlang" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="однородная">однородная</SelectItem>
                <SelectItem value="неоднородная">неоднородная</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Узлы</Label>
            <Select
              value={data.left_nodules || ""}
              onValueChange={(v) => updateField("left_nodules", v)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Tanlang" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="нет">нет</SelectItem>
                <SelectItem value="есть">есть</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        {data.left_nodules === "есть" && (
          <div className="mt-4 p-4 border rounded-lg bg-muted/50">
            <h4 className="font-medium mb-3">Узловое образование левой доли</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label>Размер (мм)</Label>
                <Input
                  placeholder="длина x ширина x толщина"
                  value={data.left_nodule_size || ""}
                  onChange={(e) => updateField("left_nodule_size", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Эхогенность</Label>
                <Select
                  value={data.left_nodule_echo || ""}
                  onValueChange={(v) => updateField("left_nodule_echo", v)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Tanlang" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="изоэхогенное">изоэхогенное</SelectItem>
                    <SelectItem value="гипоэхогенное">гипоэхогенное</SelectItem>
                    <SelectItem value="гиперэхогенное">гиперэхогенное</SelectItem>
                    <SelectItem value="анэхогенное">анэхогенное</SelectItem>
                    <SelectItem value="смешанное">смешанное</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Контуры</Label>
                <Select
                  value={data.left_nodule_contours || ""}
                  onValueChange={(v) => updateField("left_nodule_contours", v)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Tanlang" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ровные, четкие">ровные, четкие</SelectItem>
                    <SelectItem value="неровные">неровные</SelectItem>
                    <SelectItem value="нечеткие">нечеткие</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Структура</Label>
                <Select
                  value={data.left_nodule_structure || ""}
                  onValueChange={(v) => updateField("left_nodule_structure", v)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Tanlang" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="однородная">однородная</SelectItem>
                    <SelectItem value="неоднородная">неоднородная</SelectItem>
                    <SelectItem value="кистозная">кистозная</SelectItem>
                    <SelectItem value="с кальцинатами">с кальцинатами</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        )}
      </div>

      <Separator />

      {/* PERESHEK */}
      <div>
        <h3 className="text-lg font-semibold mb-4">ПЕРЕШЕЕК</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="space-y-2">
            <Label>Толщина (мм)</Label>
            <Input
              type="number"
              placeholder="норма до 4-5"
              value={data.isthmus_thickness || ""}
              onChange={(e) => updateField("isthmus_thickness", e.target.value)}
            />
            <span className="text-xs text-muted-foreground">норма до 4-5</span>
          </div>
          <div className="space-y-2">
            <Label>Структура</Label>
            <Select
              value={data.isthmus_structure || ""}
              onValueChange={(v) => updateField("isthmus_structure", v)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Tanlang" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="однородная">однородная</SelectItem>
                <SelectItem value="неоднородная">неоднородная</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Узлы</Label>
            <Select
              value={data.isthmus_nodules || ""}
              onValueChange={(v) => updateField("isthmus_nodules", v)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Tanlang" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="нет">нет</SelectItem>
                <SelectItem value="есть">есть</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <Separator />

      {/* UMUMIY HAJM VA LIMFA */}
      <div>
        <h3 className="text-lg font-semibold mb-4">ОБЩИЙ ОБЪЕМ И ЛИМФОУЗЛЫ</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="space-y-2">
            <Label>Общий объем ЩЖ (мл)</Label>
            <Input
              type="text"
              value={totalVolume}
              readOnly
              className="bg-muted"
            />
            <span className="text-xs text-muted-foreground">
              норма: жен 9-18, муж 9-25
            </span>
          </div>
          <div className="space-y-2">
            <Label>Регионарные лимфоузлы</Label>
            <Select
              value={data.lymph_nodes || ""}
              onValueChange={(v) => updateField("lymph_nodes", v)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Tanlang" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="не увеличены">не увеличены</SelectItem>
                <SelectItem value="увеличены">увеличены</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Кровоток (ЦДК)</Label>
            <Select
              value={data.blood_flow || ""}
              onValueChange={(v) => updateField("blood_flow", v)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Tanlang" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="обычный">обычный</SelectItem>
                <SelectItem value="усилен">усилен</SelectItem>
                <SelectItem value="снижен">снижен</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <Separator />

      {/* TI-RADS */}
      <div>
        <h3 className="text-lg font-semibold mb-4">КЛАССИФИКАЦИЯ TI-RADS</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>TI-RADS (если есть узлы)</Label>
            <Select
              value={data.tirads || ""}
              onValueChange={(v) => updateField("tirads", v)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Tanlang" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">TI-RADS 1 - норма</SelectItem>
                <SelectItem value="2">TI-RADS 2 - доброкачественное</SelectItem>
                <SelectItem value="3">TI-RADS 3 - вероятно доброкачественное</SelectItem>
                <SelectItem value="4a">TI-RADS 4a - низкий риск</SelectItem>
                <SelectItem value="4b">TI-RADS 4b - умеренный риск</SelectItem>
                <SelectItem value="4c">TI-RADS 4c - высокий риск</SelectItem>
                <SelectItem value="5">TI-RADS 5 - злокачественное</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <Separator />

      {/* QOSHIMCHA */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Дополнительные сведения</h3>
        <div className="space-y-2">
          <Label>Примечание</Label>
          <Textarea
            placeholder="Дополнительные наблюдения..."
            value={data.notes || ""}
            onChange={(e) => updateField("notes", e.target.value)}
          />
        </div>
      </div>
    </div>
  )
}
