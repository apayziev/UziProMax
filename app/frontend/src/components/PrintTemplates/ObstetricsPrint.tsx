import type { ExaminationData } from "./PrintLayout"

interface ObstetricsPrintProps {
  data: ExaminationData
}

export function ObstetricsPrint({ data }: ObstetricsPrintProps) {
  return (
    <div className="space-y-4">
      {/* Homiladorlik ma'lumotlari */}
      <div>
        <h4 className="font-bold text-primary">БЕРЕМЕННОСТЬ:</h4>
        <p>
          {data.gestational_weeks && `Срок: ${data.gestational_weeks} нед ${data.gestational_days || 0} дн. `}
          {data.fetus_count && `Количество плодов: ${data.fetus_count}. `}
          {data.presentation && `Предлежание: ${data.presentation}.`}
        </p>
      </div>

      {/* Fetometriya */}
      <div>
        <h4 className="font-bold text-primary">ФЕТОМЕТРИЯ:</h4>
        <p>
          {data.crl && `КТР: ${data.crl} мм. `}
          {data.nt && `ТВП: ${data.nt} мм. `}
          {data.bpd && `БПР: ${data.bpd} мм. `}
          {data.ofd && `ЛЗР: ${data.ofd} мм. `}
          {data.hc && `ОГ: ${data.hc} мм. `}
          {data.ac && `ОЖ: ${data.ac} мм. `}
          {data.fl && `ДБК: ${data.fl} мм. `}
          {data.hl && `ДПК: ${data.hl} мм. `}
          {data.fhr && `ЧСС: ${data.fhr} уд/мин. `}
          {data.fetal_weight && `Масса плода: ${data.fetal_weight} г.`}
        </p>
      </div>

      {/* Platsenta */}
      {data.placenta_location && (
        <div>
          <h4 className="font-bold text-primary">ПЛАЦЕНТА:</h4>
          <p>
            Расположение: {data.placenta_location}.
            {data.placenta_thickness && ` Толщина: ${data.placenta_thickness} мм.`}
            {data.placenta_grade && ` Степень зрелости: ${data.placenta_grade}.`}
            {data.placenta_structure && ` Структура: ${data.placenta_structure}.`}
          </p>
        </div>
      )}

      {/* Amniotik suyuqlik */}
      {data.amniotic_fluid && (
        <div>
          <h4 className="font-bold text-primary">ОКОЛОПЛОДНЫЕ ВОДЫ:</h4>
          <p>
            {data.amniotic_fluid}.
            {data.afi && ` ИАЖ: ${data.afi} мм.`}
          </p>
        </div>
      )}

      {/* Bachadon bo'yni */}
      {data.cervix_length && (
        <div>
          <h4 className="font-bold text-primary">ШЕЙКА МАТКИ:</h4>
          <p>
            Длина: {data.cervix_length} мм.
            {data.internal_os && ` Внутренний зев: ${data.internal_os}.`}
          </p>
        </div>
      )}
    </div>
  )
}
