/**
 * Sut bezlari UZI formasi - Молочные железы
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

interface BreastFormProps {
  data: Record<string, any>
  onChange: (data: Record<string, any>) => void
}

export function BreastForm({ data, onChange }: BreastFormProps) {
  const updateField = (field: string, value: any) => {
    onChange({ ...data, [field]: value })
  }

  return (
    <div className="space-y-6">
      {/* UMUMIY MA'LUMOTLAR */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Общие данные</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label>Жалобы</Label>
            <Select
              value={data.complaints || ""}
              onValueChange={(v) => updateField("complaints", v)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Tanlang" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="нет">нет</SelectItem>
                <SelectItem value="боль">боль</SelectItem>
                <SelectItem value="уплотнение">уплотнение</SelectItem>
                <SelectItem value="выделения">выделения</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>День менструального цикла</Label>
            <Input
              type="number"
              placeholder="1-30"
              value={data.cycle_day || ""}
              onChange={(e) => updateField("cycle_day", e.target.value)}
            />
          </div>
        </div>
      </div>

      <Separator />

      {/* O'NG SUt BEZI */}
      <div>
        <h3 className="text-lg font-semibold mb-4">ПРАВАЯ МОЛОЧНАЯ ЖЕЛЕЗА</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label>Толщина железы (мм)</Label>
            <Input
              type="number"
              value={data.right_thickness || ""}
              onChange={(e) => updateField("right_thickness", e.target.value)}
            />
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
                <SelectItem value="железистый">железистый тип</SelectItem>
                <SelectItem value="смешанный">смешанный тип</SelectItem>
                <SelectItem value="жировой">жировой тип</SelectItem>
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
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Протоки</Label>
            <Select
              value={data.right_ducts || ""}
              onValueChange={(v) => updateField("right_ducts", v)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Tanlang" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="не расширены">не расширены</SelectItem>
                <SelectItem value="расширены">расширены</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Образования</Label>
            <Select
              value={data.right_lesions || ""}
              onValueChange={(v) => updateField("right_lesions", v)}
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
          {data.right_lesions === "есть" && (
            <>
              <div className="space-y-2">
                <Label>Локализация</Label>
                <Input
                  placeholder="на ... часах"
                  value={data.right_lesion_location || ""}
                  onChange={(e) => updateField("right_lesion_location", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Размер образования (мм)</Label>
                <Input
                  placeholder="длина x ширина"
                  value={data.right_lesion_size || ""}
                  onChange={(e) => updateField("right_lesion_size", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Характер образования</Label>
                <Select
                  value={data.right_lesion_type || ""}
                  onValueChange={(v) => updateField("right_lesion_type", v)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Tanlang" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="анэхогенное">анэхогенное (киста)</SelectItem>
                    <SelectItem value="гипоэхогенное">гипоэхогенное</SelectItem>
                    <SelectItem value="изоэхогенное">изоэхогенное</SelectItem>
                    <SelectItem value="гиперэхогенное">гиперэхогенное</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Контуры</Label>
                <Select
                  value={data.right_lesion_margins || ""}
                  onValueChange={(v) => updateField("right_lesion_margins", v)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Tanlang" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ровные">ровные</SelectItem>
                    <SelectItem value="неровные">неровные</SelectItem>
                    <SelectItem value="нечеткие">нечеткие</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </>
          )}
        </div>
      </div>

      <Separator />

      {/* CHAP SUT BEZI */}
      <div>
        <h3 className="text-lg font-semibold mb-4">ЛЕВАЯ МОЛОЧНАЯ ЖЕЛЕЗА</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label>Толщина железы (мм)</Label>
            <Input
              type="number"
              value={data.left_thickness || ""}
              onChange={(e) => updateField("left_thickness", e.target.value)}
            />
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
                <SelectItem value="железистый">железистый тип</SelectItem>
                <SelectItem value="смешанный">смешанный тип</SelectItem>
                <SelectItem value="жировой">жировой тип</SelectItem>
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
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Протоки</Label>
            <Select
              value={data.left_ducts || ""}
              onValueChange={(v) => updateField("left_ducts", v)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Tanlang" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="не расширены">не расширены</SelectItem>
                <SelectItem value="расширены">расширены</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Образования</Label>
            <Select
              value={data.left_lesions || ""}
              onValueChange={(v) => updateField("left_lesions", v)}
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
          {data.left_lesions === "есть" && (
            <>
              <div className="space-y-2">
                <Label>Локализация</Label>
                <Input
                  placeholder="на ... часах"
                  value={data.left_lesion_location || ""}
                  onChange={(e) => updateField("left_lesion_location", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Размер образования (мм)</Label>
                <Input
                  placeholder="длина x ширина"
                  value={data.left_lesion_size || ""}
                  onChange={(e) => updateField("left_lesion_size", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Характер образования</Label>
                <Select
                  value={data.left_lesion_type || ""}
                  onValueChange={(v) => updateField("left_lesion_type", v)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Tanlang" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="анэхогенное">анэхогенное (киста)</SelectItem>
                    <SelectItem value="гипоэхогенное">гипоэхогенное</SelectItem>
                    <SelectItem value="изоэхогенное">изоэхогенное</SelectItem>
                    <SelectItem value="гиперэхогенное">гиперэхогенное</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Контуры</Label>
                <Select
                  value={data.left_lesion_margins || ""}
                  onValueChange={(v) => updateField("left_lesion_margins", v)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Tanlang" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ровные">ровные</SelectItem>
                    <SelectItem value="неровные">неровные</SelectItem>
                    <SelectItem value="нечеткие">нечеткие</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </>
          )}
        </div>
      </div>

      <Separator />

      {/* LIMFA TUGUNLARI */}
      <div>
        <h3 className="text-lg font-semibold mb-4">РЕГИОНАРНЫЕ ЛИМФОУЗЛЫ</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label>Подмышечные справа</Label>
            <Select
              value={data.right_axillary_ln || ""}
              onValueChange={(v) => updateField("right_axillary_ln", v)}
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
            <Label>Подмышечные слева</Label>
            <Select
              value={data.left_axillary_ln || ""}
              onValueChange={(v) => updateField("left_axillary_ln", v)}
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
        </div>
      </div>

      <Separator />

      {/* BI-RADS */}
      <div>
        <h3 className="text-lg font-semibold mb-4">КЛАССИФИКАЦИЯ BI-RADS</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Правая молочная железа</Label>
            <Select
              value={data.right_birads || ""}
              onValueChange={(v) => updateField("right_birads", v)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Tanlang" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">BI-RADS 0 - требуется доп. обследование</SelectItem>
                <SelectItem value="1">BI-RADS 1 - норма</SelectItem>
                <SelectItem value="2">BI-RADS 2 - доброкачественные изменения</SelectItem>
                <SelectItem value="3">BI-RADS 3 - вероятно доброкачественные</SelectItem>
                <SelectItem value="4">BI-RADS 4 - подозрение на злокачественность</SelectItem>
                <SelectItem value="5">BI-RADS 5 - высокая вероятность злокачественности</SelectItem>
                <SelectItem value="6">BI-RADS 6 - подтвержденная злокачественность</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Левая молочная железа</Label>
            <Select
              value={data.left_birads || ""}
              onValueChange={(v) => updateField("left_birads", v)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Tanlang" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">BI-RADS 0 - требуется доп. обследование</SelectItem>
                <SelectItem value="1">BI-RADS 1 - норма</SelectItem>
                <SelectItem value="2">BI-RADS 2 - доброкачественные изменения</SelectItem>
                <SelectItem value="3">BI-RADS 3 - вероятно доброкачественные</SelectItem>
                <SelectItem value="4">BI-RADS 4 - подозрение на злокачественность</SelectItem>
                <SelectItem value="5">BI-RADS 5 - высокая вероятность злокачественности</SelectItem>
                <SelectItem value="6">BI-RADS 6 - подтвержденная злокачественность</SelectItem>
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
