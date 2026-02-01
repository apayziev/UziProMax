/**
 * Akusherlik UZI formasi - Homiladorlik skriningi
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

interface ObstetricsFormProps {
  data: Record<string, any>
  onChange: (data: Record<string, any>) => void
  templateType: string
}

export function ObstetricsForm({ data, onChange, templateType }: ObstetricsFormProps) {
  const updateField = (field: string, value: any) => {
    onChange({ ...data, [field]: value })
  }

  const isFirstTrimester = templateType === "obstetrics_1"
  const isDoppler = templateType === "doppler"

  return (
    <div className="space-y-6">
      {/* HOMILADORLIK MA'LUMOTLARI */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Беременность</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label>1-й день последней менструации</Label>
            <Input
              type="date"
              value={data.last_menstruation || ""}
              onChange={(e) => updateField("last_menstruation", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Срок беременности</Label>
            <div className="flex gap-2">
              <Input
                type="number"
                placeholder="нед"
                className="w-20"
                value={data.gestational_weeks || ""}
                onChange={(e) => updateField("gestational_weeks", e.target.value)}
              />
              <Input
                type="number"
                placeholder="дн"
                className="w-20"
                value={data.gestational_days || ""}
                onChange={(e) => updateField("gestational_days", e.target.value)}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Предполагаемая дата родов</Label>
            <Input
              type="date"
              value={data.edd || ""}
              onChange={(e) => updateField("edd", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Количество плодов</Label>
            <Select
              value={data.fetus_count || "1"}
              onValueChange={(v) => updateField("fetus_count", v)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1</SelectItem>
                <SelectItem value="2">2 (двойня)</SelectItem>
                <SelectItem value="3">3 (тройня)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Предлежание</Label>
            <Select
              value={data.presentation || ""}
              onValueChange={(v) => updateField("presentation", v)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Tanlang" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="головное">головное</SelectItem>
                <SelectItem value="тазовое">тазовое</SelectItem>
                <SelectItem value="поперечное">поперечное</SelectItem>
                <SelectItem value="косое">косое</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <Separator />

      {/* FETOMETRIYA */}
      <div>
        <h3 className="text-lg font-semibold mb-4">ФЕТОМЕТРИЯ</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {isFirstTrimester ? (
            <>
              <div className="space-y-2">
                <Label>КТР (мм)</Label>
                <Input
                  type="number"
                  placeholder="Копчико-теменной размер"
                  value={data.crl || ""}
                  onChange={(e) => updateField("crl", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>ТВП (мм)</Label>
                <Input
                  type="number"
                  placeholder="норма до 2.5"
                  value={data.nt || ""}
                  onChange={(e) => updateField("nt", e.target.value)}
                />
                <span className="text-xs text-muted-foreground">норма до 2.5</span>
              </div>
              <div className="space-y-2">
                <Label>Носовая кость</Label>
                <Select
                  value={data.nasal_bone || ""}
                  onValueChange={(v) => updateField("nasal_bone", v)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Tanlang" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="определяется">определяется</SelectItem>
                    <SelectItem value="не определяется">не определяется</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </>
          ) : (
            <>
              <div className="space-y-2">
                <Label>БПР (мм)</Label>
                <Input
                  type="number"
                  placeholder="бипариетальный"
                  value={data.bpd || ""}
                  onChange={(e) => updateField("bpd", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>ЛЗР (мм)</Label>
                <Input
                  type="number"
                  placeholder="лобно-затылочный"
                  value={data.ofd || ""}
                  onChange={(e) => updateField("ofd", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>ОГ (мм)</Label>
                <Input
                  type="number"
                  placeholder="окружность головы"
                  value={data.hc || ""}
                  onChange={(e) => updateField("hc", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>ОЖ (мм)</Label>
                <Input
                  type="number"
                  placeholder="окружность живота"
                  value={data.ac || ""}
                  onChange={(e) => updateField("ac", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>ДБК (мм)</Label>
                <Input
                  type="number"
                  placeholder="длина бедра"
                  value={data.fl || ""}
                  onChange={(e) => updateField("fl", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>ДПК (мм)</Label>
                <Input
                  type="number"
                  placeholder="длина плеча"
                  value={data.hl || ""}
                  onChange={(e) => updateField("hl", e.target.value)}
                />
              </div>
            </>
          )}
          <div className="space-y-2">
            <Label>ЧСС (уд/мин)</Label>
            <Input
              type="number"
              placeholder="норма 120-160"
              value={data.fhr || ""}
              onChange={(e) => updateField("fhr", e.target.value)}
            />
            <span className="text-xs text-muted-foreground">норма 120-160</span>
          </div>
          {!isFirstTrimester && (
            <div className="space-y-2">
              <Label>Масса плода (г)</Label>
              <Input
                type="number"
                value={data.fetal_weight || ""}
                onChange={(e) => updateField("fetal_weight", e.target.value)}
              />
            </div>
          )}
        </div>
      </div>

      <Separator />

      {/* ANATOMIYA */}
      <div>
        <h3 className="text-lg font-semibold mb-4">АНАТОМИЯ ПЛОДА</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label>Структура мозга</Label>
            <Select
              value={data.brain_structure || ""}
              onValueChange={(v) => updateField("brain_structure", v)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Tanlang" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="дифференцируется четко">дифференцируется четко</SelectItem>
                <SelectItem value="изменена">изменена</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Боковые желудочки</Label>
            <Select
              value={data.lateral_ventricles || ""}
              onValueChange={(v) => updateField("lateral_ventricles", v)}
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
            <Label>Позвоночник</Label>
            <Select
              value={data.spine || ""}
              onValueChange={(v) => updateField("spine", v)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Tanlang" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="прослеживается на всем протяжении">прослеживается</SelectItem>
                <SelectItem value="деформирован">деформирован</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>4-камерный срез сердца</Label>
            <Select
              value={data.heart_4ch || ""}
              onValueChange={(v) => updateField("heart_4ch", v)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Tanlang" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="определяется">определяется</SelectItem>
                <SelectItem value="не определяется">не определяется</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Желудок</Label>
            <Select
              value={data.stomach || ""}
              onValueChange={(v) => updateField("stomach", v)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Tanlang" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="определяется">определяется</SelectItem>
                <SelectItem value="не определяется">не определяется</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Почки</Label>
            <Select
              value={data.kidneys || ""}
              onValueChange={(v) => updateField("kidneys", v)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Tanlang" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="на типичном месте">на типичном месте</SelectItem>
                <SelectItem value="не визуализируются">не визуализируются</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Мочевой пузырь</Label>
            <Select
              value={data.bladder || ""}
              onValueChange={(v) => updateField("bladder", v)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Tanlang" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="визуализируется">визуализируется</SelectItem>
                <SelectItem value="не визуализируется">не визуализируется</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <Separator />

      {/* PLATSENTA */}
      <div>
        <h3 className="text-lg font-semibold mb-4">ПЛАЦЕНТА</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label>Расположение</Label>
            <Select
              value={data.placenta_location || ""}
              onValueChange={(v) => updateField("placenta_location", v)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Tanlang" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="по передней стенке">по передней стенке</SelectItem>
                <SelectItem value="по задней стенке">по задней стенке</SelectItem>
                <SelectItem value="в дне">в дне</SelectItem>
                <SelectItem value="низкое">низкое</SelectItem>
                <SelectItem value="предлежание">предлежание</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Толщина (мм)</Label>
            <Input
              type="number"
              value={data.placenta_thickness || ""}
              onChange={(e) => updateField("placenta_thickness", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Степень зрелости</Label>
            <Select
              value={data.placenta_grade || ""}
              onValueChange={(v) => updateField("placenta_grade", v)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Tanlang" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">0 степень (до 30 нед)</SelectItem>
                <SelectItem value="1">I степень (27-36 нед)</SelectItem>
                <SelectItem value="2">II степень (34-39 нед)</SelectItem>
                <SelectItem value="3">III степень (37-40 нед)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Структура</Label>
            <Select
              value={data.placenta_structure || ""}
              onValueChange={(v) => updateField("placenta_structure", v)}
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
        </div>
      </div>

      <Separator />

      {/* ОКОЛОПЛОДНЫЕ ВОДЫ */}
      <div>
        <h3 className="text-lg font-semibold mb-4">ОКОЛОПЛОДНЫЕ ВОДЫ</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label>Количество</Label>
            <Select
              value={data.amniotic_fluid || ""}
              onValueChange={(v) => updateField("amniotic_fluid", v)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Tanlang" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="нормальное">нормальное</SelectItem>
                <SelectItem value="маловодие">маловодие</SelectItem>
                <SelectItem value="многоводие">многоводие</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>ИАЖ (мм)</Label>
            <Input
              type="number"
              placeholder="норма 80-180"
              value={data.afi || ""}
              onChange={(e) => updateField("afi", e.target.value)}
            />
            <span className="text-xs text-muted-foreground">норма 80-180</span>
          </div>
          <div className="space-y-2">
            <Label>Качество</Label>
            <Select
              value={data.amniotic_quality || ""}
              onValueChange={(v) => updateField("amniotic_quality", v)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Tanlang" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="прозрачные">прозрачные</SelectItem>
                <SelectItem value="с взвесью">с взвесью</SelectItem>
                <SelectItem value="мутные">мутные</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <Separator />

      {/* SHEYIKA MATKI */}
      <div>
        <h3 className="text-lg font-semibold mb-4">ШЕЙКА МАТКИ</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label>Длина (мм)</Label>
            <Input
              type="number"
              placeholder="норма более 30"
              value={data.cervix_length || ""}
              onChange={(e) => updateField("cervix_length", e.target.value)}
            />
            <span className="text-xs text-muted-foreground">норма более 30</span>
          </div>
          <div className="space-y-2">
            <Label>Внутренний зев</Label>
            <Select
              value={data.internal_os || ""}
              onValueChange={(v) => updateField("internal_os", v)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Tanlang" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="закрыт">закрыт</SelectItem>
                <SelectItem value="открыт">открыт</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* DOPPLER */}
      {isDoppler && (
        <>
          <Separator />
          <div>
            <h3 className="text-lg font-semibold mb-4">ДОППЛЕРОМЕТРИЯ</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>СМА плода С/Д</Label>
                <Input
                  type="number"
                  step="0.01"
                  value={data.mca_sd || ""}
                  onChange={(e) => updateField("mca_sd", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Пупочная артерия С/Д</Label>
                <Input
                  type="number"
                  step="0.01"
                  value={data.ua_sd || ""}
                  onChange={(e) => updateField("ua_sd", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Правая МА С/Д</Label>
                <Input
                  type="number"
                  step="0.01"
                  value={data.right_ua_sd || ""}
                  onChange={(e) => updateField("right_ua_sd", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Левая МА С/Д</Label>
                <Input
                  type="number"
                  step="0.01"
                  value={data.left_ua_sd || ""}
                  onChange={(e) => updateField("left_ua_sd", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Нарушение МППК</Label>
                <Select
                  value={data.fetal_flow_disorder || ""}
                  onValueChange={(v) => updateField("fetal_flow_disorder", v)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Tanlang" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="нет">нет</SelectItem>
                    <SelectItem value="Iа степень">Iа степень</SelectItem>
                    <SelectItem value="Iб степень">Iб степень</SelectItem>
                    <SelectItem value="II степень">II степень</SelectItem>
                    <SelectItem value="III степень">III степень</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
