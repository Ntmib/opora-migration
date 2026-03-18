import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Пользовательское соглашение",
};

export default function TermsPage() {
  return (
    <section className="py-16 sm:py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-gray max-w-none">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Пользовательское соглашение
        </h1>

        <p className="text-sm text-gray-500 mb-8">
          Последнее обновление: 18 марта 2026 г.
        </p>

        <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">
          1. Общие положения
        </h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          Настоящее Пользовательское соглашение (далее — Соглашение) регулирует отношения
          между Комитетом «ОПОРЫ РОССИИ» по развитию национального рынка труда и мониторингу
          миграционных процессов (далее — Комитет) и пользователем сайта opora-migration.ru
          (далее — Сайт).
        </p>
        <p className="text-gray-700 leading-relaxed mb-4">
          Используя Сайт, вы подтверждаете, что ознакомились с условиями настоящего Соглашения
          и принимаете их в полном объёме.
        </p>

        <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">
          2. Предмет соглашения
        </h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          Комитет предоставляет пользователю доступ к информационным материалам Сайта,
          а также возможность направления обращений через контактные формы.
        </p>

        <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">
          3. Условия использования
        </h2>
        <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
          <li>Пользователь обязуется использовать Сайт в соответствии с законодательством Российской Федерации.</li>
          <li>Запрещается использовать Сайт для распространения вредоносного программного обеспечения, спама, а также любых материалов, нарушающих права третьих лиц.</li>
          <li>Пользователь обязуется не предпринимать действий, направленных на нарушение работоспособности Сайта.</li>
          <li>При отправке форм пользователь гарантирует достоверность предоставляемых данных.</li>
        </ul>

        <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">
          4. Интеллектуальная собственность
        </h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          Все материалы, размещённые на Сайте (тексты, изображения, логотипы, графические элементы),
          являются объектами интеллектуальной собственности Комитета и/или «ОПОРЫ РОССИИ» и охраняются
          законодательством Российской Федерации об авторском праве.
        </p>
        <p className="text-gray-700 leading-relaxed mb-4">
          Использование материалов Сайта допускается только с письменного разрешения Комитета
          или со ссылкой на первоисточник при цитировании в информационных целях.
        </p>

        <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">
          5. Ограничение ответственности
        </h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          Материалы Сайта предоставляются «как есть». Комитет не гарантирует бесперебойную работу
          Сайта и не несёт ответственности за возможные технические сбои.
        </p>
        <p className="text-gray-700 leading-relaxed mb-4">
          Комитет не несёт ответственности за содержание сайтов третьих лиц, на которые могут вести
          ссылки с данного Сайта.
        </p>

        <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">
          6. Персональные данные
        </h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          Обработка персональных данных пользователей осуществляется в соответствии с{" "}
          <a href="/privacy" className="text-primary hover:underline">
            Политикой конфиденциальности
          </a>{" "}
          и Федеральным законом от 27.07.2006 № 152-ФЗ «О персональных данных».
        </p>

        <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">
          7. Разрешение споров
        </h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          Все споры, связанные с использованием Сайта, разрешаются путём переговоров.
          В случае невозможности достижения согласия споры подлежат рассмотрению
          в соответствии с законодательством Российской Федерации.
        </p>

        <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">
          8. Изменение условий
        </h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          Комитет оставляет за собой право изменять условия настоящего Соглашения без
          предварительного уведомления пользователей. Актуальная версия Соглашения
          размещается на данной странице.
        </p>

        <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">
          9. Контактная информация
        </h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          По вопросам, связанным с использованием Сайта, обращайтесь:
        </p>
        <ul className="list-none text-gray-700 space-y-1 mb-4">
          <li>Email:{" "}
            <a href="mailto:migratsiya_opora@mail.ru" className="text-primary hover:underline">
              migratsiya_opora@mail.ru
            </a>
          </li>
          <li>Телефон:{" "}
            <a href="tel:+74952129017" className="text-primary hover:underline">
              8 (495) 212-90-17
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}
