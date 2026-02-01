import type { ExaminationData } from "./PrintLayout"

interface GynecologyPrintProps {
  data: ExaminationData
}

export function GynecologyPrint({ data }: GynecologyPrintProps) {
  return (
    <div className="space-y-2 text-sm">
      {/* Матка */}
      <div>
        <h4 className="font-bold text-primary">Матка:</h4>
        <p>
          положение: {data.uterus_position || "anteflexio versio"}. 
          Контуры: {data.uterus_contour || "ровные, чёткие"}, форма обычная.
        </p>
        <p>Соотношение тела матки к шейке: {data.uterus_cervix_ratio || "2:1"}.</p>
        <p>Размеры тела матки:</p>
        <div className="pl-4">
          <p>длина: <span className="font-semibold">{data.uterus_length || "___"}</span> мм (N: 44,0-70,0)</p>
          <p>толщина: <span className="font-semibold">{data.uterus_thickness || "___"}</span> мм (N: 33,0-46,0)</p>
          <p>ширина: <span className="font-semibold">{data.uterus_width || "___"}</span> мм (N: 42,0-60,0)</p>
        </div>
        <p>{data.uterus_enlarged === "да" ? "Увеличена." : "Не увеличена."}</p>
        <p>
          Структура миометрия: {data.myometrium_structure || "без особенностей (миоматозных узлов, аденомиозных очагов - не выявлено)"}. 
          Эхогенность {data.myometrium_echogenicity || "не повышена"}.
        </p>
      </div>

      {/* Эндометрий */}
      <div>
        <h4 className="font-bold text-primary">Эндометрий:</h4>
        <p>
          <span className="font-semibold">{data.endometrium_thickness || "___"}</span> мм. 
          Эхогенность {data.endometrium_echogenicity || "не повышенная"}. 
          Границы чёткие, контуры ровные. 
          Эхоструктура {data.endometrium_structure || "не изменена"}. 
          В режиме ЦДК кровоснабжение эндометрия {data.endometrium_blood_flow || "адекватное"}.
        </p>
        <p>Полость матки: {data.uterine_cavity || "не деформирована, не расширена"}.</p>
      </div>

      {/* Шейка матки */}
      <div>
        <h4 className="font-bold text-primary">Шейка матки:</h4>
        <p>
          {data.cervix_shape || "цилиндрическая"} (в норме цилиндрическая, коническая).
        </p>
        <p>Размер - в пределах нормативных показателей:</p>
        <p className="pl-4">
          длина: <span className="font-semibold">{data.cervix_length || "___"}</span> мм. 
          Стенки – без особенностей. Контуры: ровные, чёткие. 
          Эхогенность стенки: {data.cervix_echogenicity || "средняя"}.
        </p>
        <p>
          Эндоцервикс: <span className="font-semibold">{data.endocervix || "___"}</span> мм 
          (в норме в пролиферативной фазе до 5,0-6,0 мм, а в секреторной до 7,0-8,0 мм) 
          с ровными чёткими контурами, эхогенность {data.endocervix_echogenicity || "не повышенная"}.
        </p>
        <p>Полость шейки {data.cervix_cavity || "не расширена"}.</p>
      </div>

      {/* ЯИЧНИКИ */}
      <div>
        <h4 className="font-bold text-primary">ЯИЧНИКИ</h4>
      </div>

      <div>
        <p className="font-semibold">Правый яичник:</p>
        <p>
          В типичном месте. Размеры: <span className="font-semibold">{data.ovary_right_size || "___"}</span> мм 
          (в норме 30,2±0,5 х 19,2±0,3 х 23,0±0,3 мм), 
          ({data.ovary_right_enlarged === "да" ? "увеличен" : "не увеличен"}). 
          Контуры ровные, чёткие.
        </p>
        <p>
          Фолликулы {data.ovary_right_follicles || "Ø ___ мм, в количестве ___ шт"} (норма менее 12 в одном сечении), 
          максимальный фолликул {data.ovary_right_max_follicle ? `Ø ${data.ovary_right_max_follicle} мм` : "не визуализируется"}. 
          Компрессия {data.ovary_right_compression || "безболезненная"}.
        </p>
      </div>

      <div>
        <p className="font-semibold">Левый яичник:</p>
        <p>
          В типичном месте. Размеры: <span className="font-semibold">{data.ovary_left_size || "___"}</span> мм 
          (в норме 30,7±0,7 х 19,5±0,4 х 20,4±0,7 мм), 
          ({data.ovary_left_enlarged === "да" ? "увеличен" : "не увеличен"}). 
          Контуры ровные, чёткие.
        </p>
        <p>
          Фолликулы {data.ovary_left_follicles || "Ø ___ мм, в количестве ___ шт"}, 
          максимальный фолликул {data.ovary_left_max_follicle ? `Ø ${data.ovary_left_max_follicle} мм` : "нет"}. 
          Компрессия {data.ovary_left_compression || "безболезненная"}.
        </p>
      </div>

      {/* Qo'shimcha */}
      <div className="space-y-0.5">
        <p><span className="font-semibold">Маточные трубы:</span> {data.fallopian_tubes || "не виз-ся"} (в норме не виз-ся)</p>
        <p><span className="font-semibold">Жидкость в полости малого таза:</span> {data.fluid_in_pelvis || "не визуализируется"}.</p>
        <p><span className="font-semibold">Вены малого таза:</span> {data.pelvic_veins || "не расширены"}.</p>
      </div>

      {/* Mioma */}
      {(data.myoma_count || data.myoma_sizes) && (
        <div>
          <h4 className="font-bold text-primary">МИОМАТОЗНЫЕ УЗЛЫ:</h4>
          <p>
            {data.myoma_count && `Количество: ${data.myoma_count} шт. `}
            {data.myoma_location && `Локализация: ${data.myoma_location}. `}
            {data.myoma_sizes && `Размеры: ${data.myoma_sizes}. `}
            {data.myoma_figo && `Тип по FIGO: ${data.myoma_figo}.`}
          </p>
        </div>
      )}
    </div>
  )
}
