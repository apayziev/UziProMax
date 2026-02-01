import type { ExaminationData } from "./PrintLayout"

interface AbdominalPrintProps {
  data: ExaminationData
}

export function AbdominalPrint({ data }: AbdominalPrintProps) {
  return (
    <div className="space-y-3 text-sm">
      {/* ПЕЧЕНЬ */}
      <div>
        <h4 className="font-bold text-primary">ПЕЧЕНЬ:</h4>
        <p>
          Контуры печени {data.liver_contour || "ровные, четкие"}. 
          Нижний край правой доли {data.liver_edge || "закруглён"}. 
          Капсула {data.liver_capsule || "дифференцируется отчётливо, не утолщена"}. 
          Звукопроводимость – {data.liver_sound || "сохранена (хорошая)"}, визуализация дальней зоны паренхимы и диафрагмы чёткая.
        </p>
        <p className="font-semibold mt-1">Размеры:</p>
        <div className="grid grid-cols-2 gap-2 pl-4">
          <div>
            <p className="font-medium">Правая доля:</p>
            <p>КВР: <span className="font-semibold">{data.liver_kvr_right || "___"}</span> мм (норма до 150-160 мм)</p>
            <p>ККР: <span className="font-semibold">{data.liver_kkr_right || "___"}</span> мм (норма до 125-140 мм)</p>
            <p>ПЗР: <span className="font-semibold">{data.liver_pzr_right || "___"}</span> мм (норма до 125 мм)</p>
          </div>
          <div>
            <p className="font-medium">Левая доля:</p>
            <p>КВР: <span className="font-semibold">{data.liver_kvr_left || "___"}</span> мм (норма до 100 мм)</p>
            <p>ПЗР: <span className="font-semibold">{data.liver_pzr_left || "___"}</span> мм (норма до 60 мм)</p>
            <p>Хвостатая доля: <span className="font-semibold">{data.liver_caudate || "___"}</span> мм (норма до 20 мм)</p>
          </div>
        </div>
        <p className="mt-1">
          Эхоструктура печени {data.liver_echostructure || "эхооднородная"}. 
          Паренхима {data.liver_echogenicity || "не повышенной эхогенности"}.
          В структуре печени очаговых изменений {data.liver_focal || "не выявлено"}.
        </p>
        <p className="mt-1 font-semibold">Сосуды печени:</p>
        <p className="pl-4">
          V. portae – <span className="font-semibold">{data.portal_vein || "___"}</span> мм (норма 7,0-12,5-14,0 мм).
          Нижняя полая вена (IVC) – <span className="font-semibold">{data.ivc || "___"}</span> мм (норма 12,0-17,0-23,0 мм).
        </p>
        <p>
          Сосудистый рисунок печени {data.liver_vessels || "не обеднён, чётко визуализируется до периферических зон"}.
          Внутри- и внепечёночные желчные протоки {data.bile_ducts || "не расширены"}, 
          максимальный диаметр общего желчного протока (choledoch) – <span className="font-semibold">{data.choledoch || "___"}</span> мм (норма до 4,0-6,0-8,0 мм).
        </p>
      </div>

      {/* ЖЕЛЧНЫЙ ПУЗЫРЬ */}
      <div>
        <h4 className="font-bold text-primary">ЖЕЛЧНЫЙ ПУЗЫРЬ:</h4>
        <p>
          Форма: {data.gallbladder_shape || "грушевидная"} (в норме грушевидная). 
          {data.gallbladder_bend && `Перегиб желчного пузыря ${data.gallbladder_bend}. `}
        </p>
        <p>
          Размеры: <span className="font-semibold">{data.gallbladder_size || "___"}</span> мм. 
          {data.gallbladder_after_meal && `После еды. `}
          {data.gallbladder_enlarged === "да" ? "Увеличен." : "Не увеличен."}
        </p>
        <p>
          Стенки: {data.gallbladder_wall_contour || "ровные, чёткие"}, 
          толщина <span className="font-semibold">{data.gallbladder_wall || "___"}</span> мм (норма 1-2 мм). 
          Содержимое {data.gallbladder_content || "гомогенное"}, 
          интра- и паравезикальных дополнительных включений {data.gallbladder_inclusions || "не выявляется"}.
          Внутрипросветные образования {data.gallbladder_formations || "нет"}.
        </p>
      </div>

      {/* ЖЕЛЧНЫЕ ПРОТОКИ */}
      <div>
        <h4 className="font-bold text-primary">ЖЕЛЧНЫЕ ПРОТОКИ:</h4>
        <p>
          Общий желчный проток {data.common_bile_duct || "не расширен"}, 
          внутрипечёночные желчные протоки {data.intrahepatic_ducts || "не расширены"}, 
          дополнительные образования {data.bile_duct_formations || "нет"}.
        </p>
      </div>

      {/* ПОДЖЕЛУДОЧНАЯ ЖЕЛЕЗА */}
      <div>
        <h4 className="font-bold text-primary">ПОДЖЕЛУДОЧНАЯ ЖЕЛЕЗА:</h4>
        <p>
          Топография: {data.pancreas_topography || "расположена обычно (над селезёночной веной)"}.
          Форма: {data.pancreas_shape || "обычная"} (в норме гантелевидная, колбасовидная, в виде головастика).
          Контуры: {data.pancreas_contour || "ровные, чёткие"}.
        </p>
        <p>
          Размеры: длина <span className="font-semibold">{data.pancreas_length || "___"}</span> мм (норма 80-125 мм). 
          Толщина: головка <span className="font-semibold">{data.pancreas_head || "___"}</span> мм (норма 11-32 мм), 
          тело <span className="font-semibold">{data.pancreas_body || "___"}</span> мм (норма 4-21 мм), 
          хвост <span className="font-semibold">{data.pancreas_tail || "___"}</span> мм (норма 7-35 мм).
        </p>
        <p>
          Эхоструктура: {data.pancreas_echostructure || "однородная"}. 
          Эхогенность: {data.pancreas_echogenicity || "не повышена (средняя)"}. 
          Звукопроводимость: {data.pancreas_sound || "сохранена"}.
        </p>
        <p>
          Главный панкреатический проток: диаметр в области головки <span className="font-semibold">{data.pancreas_duct || "___"}</span> мм (норма 3-4 мм).
        </p>
      </div>

      {/* СЕЛЕЗЕНКА */}
      <div>
        <h4 className="font-bold text-primary">СЕЛЕЗЕНКА:</h4>
        <p>
          Форма: {data.spleen_shape || "обычная (серповидная)"}. 
          Контуры: {data.spleen_contour || "ровные, чёткие"}.
        </p>
        <p>
          Размеры: <span className="font-semibold">{data.spleen_size || "___"}</span> мм (норма: длина 90-125 мм, ширина 50-70 мм).
        </p>
        <p>
          Эхоструктура: {data.spleen_echostructure || "однородная"}. 
          Эхогенность: {data.spleen_echogenicity || "не повышена"}. 
          Селезёночная вена – <span className="font-semibold">{data.spleen_vein || "___"}</span> мм, {data.spleen_vein_state || "не расширена"}.
        </p>
      </div>

      {/* ПРАВАЯ ПОЧКА */}
      <div>
        <h4 className="font-bold text-primary">ПРАВАЯ ПОЧКА:</h4>
        <p>
          Расположена на обычном месте. Дыхательная подвижность {data.kidney_right_mobility || "сохранена"}. 
          Капсула почки {data.kidney_right_capsule || "прослеживается на всём протяжении"}. 
          Контур {data.kidney_right_contour || "ровный, чёткий"}.
        </p>
        <p>
          Размеры: <span className="font-semibold">{data.kidney_right_size || "___"}</span> мм. 
          Толщина почечной паренхимы: <span className="font-semibold">{data.kidney_right_parenchyma || "___"}</span> мм.
        </p>
        <p>
          Паренхима {data.kidney_right_echo || "однородная, эхогенность не повышена"}. 
          ЧЛС – {data.kidney_right_pcs || "не расширена"}. 
          {data.kidney_right_stones && `Опр-ся ${data.kidney_right_stones}. `}
          Паранефрий {data.kidney_right_paranephrium || "без изменений"}.
        </p>
      </div>

      {/* ЛЕВАЯ ПОЧКА */}
      <div>
        <h4 className="font-bold text-primary">ЛЕВАЯ ПОЧКА:</h4>
        <p>
          Расположена на обычном месте. Дыхательная подвижность {data.kidney_left_mobility || "сохранена"}. 
          Капсула почки {data.kidney_left_capsule || "прослеживается на всём протяжении"}. 
          Контур {data.kidney_left_contour || "ровный, чёткий"}.
        </p>
        <p>
          Размеры: <span className="font-semibold">{data.kidney_left_size || "___"}</span> мм. 
          Толщина почечной паренхимы: <span className="font-semibold">{data.kidney_left_parenchyma || "___"}</span> мм.
        </p>
        <p>
          Паренхима {data.kidney_left_echo || "однородная, эхогенность не повышена"}. 
          ЧЛС – {data.kidney_left_pcs || "не расширена"}. 
          {data.kidney_left_stones && `Опр-ся ${data.kidney_left_stones}. `}
          Паранефрий {data.kidney_left_paranephrium || "без изменений"}.
        </p>
      </div>

      {/* Свободная жидкость */}
      {data.free_fluid && (
        <div>
          <p><span className="font-semibold">Свободная жидкость в брюшной полости:</span> {data.free_fluid}.</p>
        </div>
      )}
    </div>
  )
}
