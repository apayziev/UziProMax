/**
 * Ginekologiya UZI formasi - Матка, Кисты, Миома
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

interface GynecologyFormProps {
  data: Record<string, any>
  onChange: (data: Record<string, any>) => void
  templateType: string
}

export function GynecologyForm({ data, onChange, templateType }: GynecologyFormProps) {
  const updateField = (field: string, value: any) => {
    onChange({ ...data, [field]: value })
  }

  return (
    <div className="space-y-6">
      {/* HAYZ KUNI */}
      <div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>День последней менструации</Label>
            <Input
              type="date"
              value={data.last_menstruation || ""}
              onChange={(e) => updateField("last_menstruation", e.target.value)}
            />
          </div>
        </div>
      </div>

      <Separator />

      {/* BACHADON - МАТКА */}
      <div>
        <h3 className="text-lg font-semibold mb-4">МАТКА (Bachadon)</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label>Положение</Label>
            <Select
              value={data.uterus_position || ""}
              onValueChange={(v) => updateField("uterus_position", v)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Tanlang" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="anteflexio">anteflexio</SelectItem>
                <SelectItem value="retroflexio">retroflexio</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Длина (мм)</Label>
            <Input
              type="number"
              placeholder="норма 44-70"
              value={data.uterus_length || ""}
              onChange={(e) => updateField("uterus_length", e.target.value)}
            />
            <span className="text-xs text-muted-foreground">норма 44-70</span>
          </div>
          <div className="space-y-2">
            <Label>Ширина (мм)</Label>
            <Input
              type="number"
              placeholder="норма 42-60"
              value={data.uterus_width || ""}
              onChange={(e) => updateField("uterus_width", e.target.value)}
            />
            <span className="text-xs text-muted-foreground">норма 42-60</span>
          </div>
          <div className="space-y-2">
            <Label>Толщина (мм)</Label>
            <Input
              type="number"
              placeholder="норма 33-46"
              value={data.uterus_thickness || ""}
              onChange={(e) => updateField("uterus_thickness", e.target.value)}
            />
            <span className="text-xs text-muted-foreground">норма 33-46</span>
          </div>
          <div className="space-y-2">
            <Label>Контуры</Label>
            <Select
              value={data.uterus_contour || ""}
              onValueChange={(v) => updateField("uterus_contour", v)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Tanlang" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ровные, четкие">ровные, четкие</SelectItem>
                <SelectItem value="неровные">неровные</SelectItem>
                <SelectItem value="бугристые">бугристые</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Структура миометрия</Label>
            <Select
              value={data.myometrium_structure || ""}
              onValueChange={(v) => updateField("myometrium_structure", v)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Tanlang" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="однородная">однородная</SelectItem>
                <SelectItem value="неоднородная">неоднородная</SelectItem>
                <SelectItem value="с узлами">с узлами</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <Separator />

      {/* ENDOMETRIY */}
      <div>
        <h3 className="text-lg font-semibold mb-4">ЭНДОМЕТРИЙ</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label>Толщина (мм)</Label>
            <Input
              type="number"
              placeholder="зависит от фазы МЦ"
              value={data.endometrium_thickness || ""}
              onChange={(e) => updateField("endometrium_thickness", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Эхоструктура</Label>
            <Select
              value={data.endometrium_structure || ""}
              onValueChange={(v) => updateField("endometrium_structure", v)}
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
            <Label>Фаза МЦ</Label>
            <Select
              value={data.menstrual_phase || ""}
              onValueChange={(v) => updateField("menstrual_phase", v)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Tanlang" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="пролиферативная">пролиферативная</SelectItem>
                <SelectItem value="секреторная">секреторная</SelectItem>
                <SelectItem value="менструальная">менструальная</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <Separator />

      {/* BACHADON BO'YNI - ШЕЙКА МАТКИ */}
      <div>
        <h3 className="text-lg font-semibold mb-4">ШЕЙКА МАТКИ (Bachadon bo'yni)</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label>Длина (мм)</Label>
            <Input
              type="number"
              value={data.cervix_length || ""}
              onChange={(e) => updateField("cervix_length", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Ширина (мм)</Label>
            <Input
              type="number"
              value={data.cervix_width || ""}
              onChange={(e) => updateField("cervix_width", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Эндоцервикс (мм)</Label>
            <Input
              type="number"
              placeholder="норма 2-8"
              value={data.endocervix || ""}
              onChange={(e) => updateField("endocervix", e.target.value)}
            />
            <span className="text-xs text-muted-foreground">норма 2-8</span>
          </div>
        </div>
      </div>

      <Separator />

      {/* TUXUMDONLAR - ЯИЧНИКИ */}
      <div>
        <h3 className="text-lg font-semibold mb-4">ЯИЧНИКИ (Tuxumdonlar)</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* O'ng tuxumdon */}
          <div className="space-y-4 p-4 border rounded-lg">
            <h4 className="font-medium">Правый яичник (O'ng)</h4>
            <div className="space-y-2">
              <Label>Размеры (мм)</Label>
              <Input
                placeholder="длина х ширина х толщина"
                value={data.ovary_right_size || ""}
                onChange={(e) => updateField("ovary_right_size", e.target.value)}
              />
              <span className="text-xs text-muted-foreground">норма 30х19х23</span>
            </div>
            <div className="space-y-2">
              <Label>Объём (мл)</Label>
              <Input
                type="number"
                value={data.ovary_right_volume || ""}
                onChange={(e) => updateField("ovary_right_volume", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Фолликулы</Label>
              <Input
                placeholder="Ø, количество"
                value={data.ovary_right_follicles || ""}
                onChange={(e) => updateField("ovary_right_follicles", e.target.value)}
              />
            </div>
            {(templateType === "gynecology_cyst" || templateType === "gynecology_myoma") && (
              <div className="space-y-2">
                <Label>Образование</Label>
                <Input
                  placeholder="размер, структура"
                  value={data.ovary_right_mass || ""}
                  onChange={(e) => updateField("ovary_right_mass", e.target.value)}
                />
              </div>
            )}
          </div>
          
          {/* Chap tuxumdon */}
          <div className="space-y-4 p-4 border rounded-lg">
            <h4 className="font-medium">Левый яичник (Chap)</h4>
            <div className="space-y-2">
              <Label>Размеры (мм)</Label>
              <Input
                placeholder="длина х ширина х толщина"
                value={data.ovary_left_size || ""}
                onChange={(e) => updateField("ovary_left_size", e.target.value)}
              />
              <span className="text-xs text-muted-foreground">норма 30х19х20</span>
            </div>
            <div className="space-y-2">
              <Label>Объём (мл)</Label>
              <Input
                type="number"
                value={data.ovary_left_volume || ""}
                onChange={(e) => updateField("ovary_left_volume", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Фолликулы</Label>
              <Input
                placeholder="Ø, количество"
                value={data.ovary_left_follicles || ""}
                onChange={(e) => updateField("ovary_left_follicles", e.target.value)}
              />
            </div>
            {(templateType === "gynecology_cyst" || templateType === "gynecology_myoma") && (
              <div className="space-y-2">
                <Label>Образование</Label>
                <Input
                  placeholder="размер, структура"
                  value={data.ovary_left_mass || ""}
                  onChange={(e) => updateField("ovary_left_mass", e.target.value)}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      <Separator />

      {/* QO'SHIMCHA */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Дополнительно</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Жидкость в малом тазу</Label>
            <Select
              value={data.fluid_in_pelvis || ""}
              onValueChange={(v) => updateField("fluid_in_pelvis", v)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Tanlang" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="не визуализируется">не визуализируется</SelectItem>
                <SelectItem value="незначительное количество">незначительное количество</SelectItem>
                <SelectItem value="умеренное количество">умеренное количество</SelectItem>
                <SelectItem value="значительное количество">значительное количество</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Вены малого таза</Label>
            <Select
              value={data.pelvic_veins || ""}
              onValueChange={(v) => updateField("pelvic_veins", v)}
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
        </div>
      </div>

      {/* Mioma uchun qo'shimcha */}
      {templateType === "gynecology_myoma" && (
        <>
          <Separator />
          <div>
            <h3 className="text-lg font-semibold mb-4">МИОМАТОЗНЫЕ УЗЛЫ</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Количество узлов</Label>
                  <Input
                    type="number"
                    value={data.myoma_count || ""}
                    onChange={(e) => updateField("myoma_count", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Локализация</Label>
                  <Select
                    value={data.myoma_location || ""}
                    onValueChange={(v) => updateField("myoma_location", v)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Tanlang" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="передняя стенка">передняя стенка</SelectItem>
                      <SelectItem value="задняя стенка">задняя стенка</SelectItem>
                      <SelectItem value="дно">дно</SelectItem>
                      <SelectItem value="боковая стенка">боковая стенка</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Тип (FIGO)</Label>
                  <Select
                    value={data.myoma_figo || ""}
                    onValueChange={(v) => updateField("myoma_figo", v)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Tanlang" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">0 - субмукозный на ножке</SelectItem>
                      <SelectItem value="1">1 - субмукозный менее 50%</SelectItem>
                      <SelectItem value="2">2 - субмукозный более 50%</SelectItem>
                      <SelectItem value="3">3 - интрамуральный</SelectItem>
                      <SelectItem value="4">4 - интрамуральный</SelectItem>
                      <SelectItem value="5">5 - субсерозный более 50%</SelectItem>
                      <SelectItem value="6">6 - субсерозный менее 50%</SelectItem>
                      <SelectItem value="7">7 - субсерозный на ножке</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Размеры узлов</Label>
                <Input
                  placeholder="размер1 мм, размер2 мм..."
                  value={data.myoma_sizes || ""}
                  onChange={(e) => updateField("myoma_sizes", e.target.value)}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
