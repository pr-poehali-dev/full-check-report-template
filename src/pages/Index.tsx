import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface ReportData {
  date: string;
  reportNumber: string;
  clientInfo: string;
  fullName: string;
  phones: string;
  emails: string;
  documents: string;
  addresses: string;
  cars: string;
  socialAccounts: string;
  phoneContacts: string;
  vkProfile: string;
  vkAnalysis: string;
  telegramId: string;
  telegramAnalysis: string;
  conclusion: string;
}

const Index = () => {
  const reportRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState('report');
  
  const getCurrentDate = () => {
    const now = new Date();
    return now.toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit'
    });
  };

  const [reportData, setReportData] = useState<ReportData>({
    date: getCurrentDate(),
    reportNumber: '№ В/П 01442-25',
    clientInfo: '',
    fullName: '',
    phones: '',
    emails: '',
    documents: '',
    addresses: '',
    cars: '',
    socialAccounts: '',
    phoneContacts: '',
    vkProfile: '',
    vkAnalysis: 'Мы провели комплексный анализ закрытого профиля ВК, используя передовые поисковые системы и специализированные инструменты. Цель — выявить признаки активности в группах и сообществах, связанных с тематикой знакомств. По результатам исследования, соответствующих групп обнаружено не было. Активность в переписке крайне низкая, основная — просмотр новостной ленты. Признаки активных знакомств отсутствуют. Дополнительных аккаунтов ВК не найдено. Возможности детального анализа ограничены настройками приватности.',
    telegramId: '',
    telegramAnalysis: 'Проведён углублённый анализ аккаунта Telegram вашей второй половины с целью выявления групп и каналов, связанных с тематикой знакомств и флирта. Использовались специализированные сервисы и инструменты. Дополнительных аккаунтов не обнаружено. Активность в тематических группах отсутствует. Настройки приватности ограничивают доступ к перепискам.',
    conclusion: 'По результатам комплексного анализа по услуге «Полная проверка на верность» предоставляем детальный отчёт и выводы. Результаты проверки положительные. Благодарим вас за доверие.'
  });

  const updateField = (field: keyof ReportData, value: string) => {
    setReportData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const exportToPDF = async () => {
    if (typeof window !== 'undefined' && window.print) {
      // Переключаемся на вкладку отчёта для печати
      setActiveTab('report');
      
      // Небольшая задержка для обновления DOM
      setTimeout(() => {
        window.print();
      }, 100);
    }
  };

  const fieldHints: Record<string, string> = {
    date: 'Укажите дату проверки в формате ДД.ММ.ГГ. По умолчанию устанавливается текущая дата.',
    reportNumber: 'Введите индивидуальный номер проверки в формате: № В/П XXXXX-XX',
    clientInfo: 'Укажите контактные данные заказчика: номер телефона, ID VK или username Telegram',
    fullName: 'Введите полное ФИО второй половины и дату рождения в формате: Иванов Иван Иванович, 15.05.1990',
    phones: 'Перечислите все найденные номера телефонов через запятую или с новой строки',
    emails: 'Укажите все найденные электронные адреса через запятую',
    documents: 'Перечислите найденные документы с указанием типа и номера (паспорт, ИНН, СНИЛС и т.д.)',
    addresses: 'Укажите все найденные адреса проживания или регистрации',
    cars: 'Перечислите государственные номера найденных автомобилей',
    socialAccounts: 'Добавьте ссылки на найденные профили в социальных сетях и мессенджерах',
    phoneContacts: 'Укажите, как вторая половина записана в телефонных книгах других людей',
    vkProfile: 'Вставьте ссылку на основной профиль ВКонтакте второй половины',
    vkAnalysis: 'Подробный анализ профиля ВК: история изменений, цифровая активность, скрытые друзья, ссылка на файл Social Graph Bot',
    telegramId: 'Введите ID или username аккаунта Telegram для анализа',
    telegramAnalysis: 'Результаты анализа Telegram: активность в группах, дополнительные аккаунты, настройки приватности',
    conclusion: 'Профессиональное заключение по результатам полной проверки с выводами о верности второй половины'
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap');
        
        body {
          font-family: 'Roboto', sans-serif;
        }
        
        @media print {
          .no-print {
            display: none !important;
          }
          
          .print-full-width {
            width: 100% !important;
            max-width: none !important;
            margin: 0 !important;
            padding: 20px !important;
          }
          
          body {
            background: white !important;
          }
        }
      `}</style>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="no-print">
          <div className="bg-white shadow-sm border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-16">
                <div className="flex items-center space-x-4">
                  <Button
                    variant={activeTab === 'report' ? 'default' : 'ghost'}
                    onClick={() => setActiveTab('report')}
                    className="text-sm font-medium"
                  >
                    <Icon name="FileText" size={16} className="mr-2" />
                    Отчёт
                  </Button>
                  <Button
                    variant={activeTab === 'params' ? 'default' : 'ghost'}
                    onClick={() => setActiveTab('params')}
                    className="text-sm font-medium"
                  >
                    <Icon name="Heart" size={16} className="mr-2" />
                    Верность.Про
                  </Button>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Button 
                    onClick={exportToPDF}
                    variant="outline"
                    size="sm"
                    className="text-sm"
                  >
                    <Icon name="Download" size={16} className="mr-2" />
                    Готовый отчёт
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <TabsContent value="report" className="mt-0">
          <div ref={reportRef} className="max-w-4xl mx-auto p-6 print-full-width">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
              {/* Заголовок */}
              <div className="text-center mb-8 border-b border-gray-200 pb-6">
                <h1 className="text-3xl font-bold text-gray-800 mb-4">
                  Полная проверка на верность
                </h1>
                <div className="flex justify-between items-center text-sm text-gray-600">
                  <span>Дата проверки: {reportData.date}</span>
                  <span className="font-medium">{reportData.reportNumber}</span>
                </div>
              </div>

              {/* Информация о заказчике */}
              <Card className="mb-6">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg text-gray-800">Информация о заказчике</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">{reportData.clientInfo || 'Не указана'}</p>
                </CardContent>
              </Card>

              {/* Общая информация о второй половине */}
              <Card className="mb-6">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg text-gray-800">Общая информация о второй половине</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium text-gray-600">ФИО и дата рождения</Label>
                      <p className="text-gray-800 mt-1">{reportData.fullName || 'Не указано'}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-600">Найденные номера телефонов</Label>
                      <p className="text-gray-800 mt-1">{reportData.phones || 'Не найдены'}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-600">Найденные E-mail адреса</Label>
                      <p className="text-gray-800 mt-1">{reportData.emails || 'Не найдены'}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-600">Найденные документы</Label>
                      <p className="text-gray-800 mt-1">{reportData.documents || 'Не найдены'}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-600">Найденные адреса</Label>
                      <p className="text-gray-800 mt-1">{reportData.addresses || 'Не найдены'}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-600">Найденные автомобили</Label>
                      <p className="text-gray-800 mt-1">{reportData.cars || 'Не найдены'}</p>
                    </div>
                  </div>
                  
                  <div>
                    <Label className="text-sm font-medium text-gray-600">Найденные аккаунты соцсетей и мессенджеров</Label>
                    <p className="text-gray-800 mt-1">{reportData.socialAccounts || 'Не найдены'}</p>
                  </div>
                  
                  <div>
                    <Label className="text-sm font-medium text-gray-600">Как вторая половина записана у других людей в телефоне</Label>
                    <p className="text-gray-800 mt-1">{reportData.phoneContacts || 'Информация не найдена'}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Анализ профиля ВКонтакте */}
              <Card className="mb-6">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg text-gray-800">
                    Полный цифровой анализ основного профиля ВКонтакте
                    {reportData.vkProfile && (
                      <span className="text-sm font-normal text-blue-600 ml-2">
                        ({reportData.vkProfile})
                      </span>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 leading-relaxed">{reportData.vkAnalysis}</p>
                </CardContent>
              </Card>

              {/* Дополнительные аккаунты */}
              <Card className="mb-6">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg text-gray-800">
                    Детальный обзор найденных дополнительных аккаунтов в соцсетях и на сайтах знакомств и флирта
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 leading-relaxed">
                    В рамках комплексной проверки на верность вашей второй половины, проведённой по всем открытым источникам с использованием специального ПО, нами выявлена связь с похожими аккаунтами в соцсетях и на сайтах знакомств, включая скрытые и удалённые профили. По результатам анализа, с уверенностью 99,9% заявляем, что эти аккаунты не принадлежат вашей второй половине и с ней не связаны. Отсутствие активных и скрытых профилей свидетельствует, что вторая половина не ведёт знакомства в интернете и не скрывает личность.
                  </p>
                </CardContent>
              </Card>

              {/* Анализ Telegram */}
              <Card className="mb-6">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg text-gray-800">
                    Детальный цифровой анализ аккаунта Telegram
                    {reportData.telegramId && (
                      <span className="text-sm font-normal text-blue-600 ml-2">
                        (ID: {reportData.telegramId})
                      </span>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 leading-relaxed">{reportData.telegramAnalysis}</p>
                </CardContent>
              </Card>

              {/* Отчёт о покупках */}
              <Card className="mb-6">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg text-gray-800">
                    Подробный отчёт о совершённых покупках в розничных и интернет-магазинах
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 leading-relaxed">
                    В рамках исследования осуществлён поиск по открытым источникам информации о последних покупках вашей второй половины. Были выявлены некоторые цифровые совпадения, но при детальном анализе подтверждение отсутствует. Информация о подозрительных покупках не обнаружена.
                  </p>
                </CardContent>
              </Card>

              {/* Заключение */}
              <Card className="mb-6">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg text-gray-800">Заключение по результатам полной проверки на верность</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 leading-relaxed">{reportData.conclusion}</p>
                </CardContent>
              </Card>

              {/* Политика конфиденциальности */}
              <Card className="mb-6">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg text-gray-800">Политика конфиденциальности и обеспечения анонимности клиентов</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 leading-relaxed">
                    В целях максимальной конфиденциальности данный отчёт передаётся исключительно заказчику и не сохраняется в системах. После отправки отчёт автоматически удаляется с сервера. Мы гарантируем полную анонимность и не передаём информацию третьим лицам. Все данные получены из общедоступных источников в рамках законодательства РФ (статья 23 Конституции и Закон № 152-ФЗ «О персональных данных»).
                  </p>
                </CardContent>
              </Card>

              {/* Уведомление для заказчика */}
              <div className="text-xs text-gray-500 mt-6 border-t border-gray-200 pt-4">
                Благодарим Вас за обращение и доверие к нашим услугам. В целях обеспечения анонимности и защиты конфиденциальных данных все отчёты отправляются исключительно заказчику и после отправки автоматически удаляются с наших серверов, исключая возможность повторной отправки.
              </div>

              {/* Подвал */}
              <div className="text-center text-xs text-gray-400 mt-8 border-t border-gray-200 pt-4">
                © All Rights Reserved. Proverka.Vernosti 2025.
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="params" className="mt-0">
          <div className="max-w-4xl mx-auto p-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <Icon name="Heart" size={24} className="mr-3 text-red-500" />
                Параметры отчёта
              </h2>
              
              <div className="space-y-8">
                {/* Основные данные */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Основная информация</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="date" className="text-sm font-medium text-gray-700">
                        Дата проверки
                      </Label>
                      <Input
                        id="date"
                        value={reportData.date}
                        onChange={(e) => updateField('date', e.target.value)}
                        className="mt-1"
                      />
                      <p className="text-xs text-gray-500 mt-1">{fieldHints.date}</p>
                    </div>
                    
                    <div>
                      <Label htmlFor="reportNumber" className="text-sm font-medium text-gray-700">
                        Номер проверки
                      </Label>
                      <Input
                        id="reportNumber"
                        value={reportData.reportNumber}
                        onChange={(e) => updateField('reportNumber', e.target.value)}
                        className="mt-1"
                      />
                      <p className="text-xs text-gray-500 mt-1">{fieldHints.reportNumber}</p>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <Label htmlFor="clientInfo" className="text-sm font-medium text-gray-700">
                      Информация о заказчике
                    </Label>
                    <Input
                      id="clientInfo"
                      value={reportData.clientInfo}
                      onChange={(e) => updateField('clientInfo', e.target.value)}
                      className="mt-1"
                      placeholder="Введите контактные данные заказчика"
                    />
                    <p className="text-xs text-gray-500 mt-1">{fieldHints.clientInfo}</p>
                  </div>
                </div>

                {/* Информация о второй половине */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Информация о второй половине</h3>
                  <div className="space-y-4">
                    {[
                      { key: 'fullName', label: 'ФИО и дата рождения', type: 'input' },
                      { key: 'phones', label: 'Найденные номера телефонов', type: 'textarea' },
                      { key: 'emails', label: 'Найденные E-mail адреса', type: 'textarea' },
                      { key: 'documents', label: 'Найденные документы', type: 'textarea' },
                      { key: 'addresses', label: 'Найденные адреса', type: 'textarea' },
                      { key: 'cars', label: 'Найденные автомобили', type: 'input' },
                      { key: 'socialAccounts', label: 'Аккаунты соцсетей и мессенджеров', type: 'textarea' },
                      { key: 'phoneContacts', label: 'Записи в телефонах других людей', type: 'textarea' }
                    ].map(({ key, label, type }) => (
                      <div key={key}>
                        <Label htmlFor={key} className="text-sm font-medium text-gray-700">
                          {label}
                        </Label>
                        {type === 'input' ? (
                          <Input
                            id={key}
                            value={reportData[key as keyof ReportData]}
                            onChange={(e) => updateField(key as keyof ReportData, e.target.value)}
                            className="mt-1"
                          />
                        ) : (
                          <Textarea
                            id={key}
                            value={reportData[key as keyof ReportData]}
                            onChange={(e) => updateField(key as keyof ReportData, e.target.value)}
                            className="mt-1 min-h-[80px]"
                          />
                        )}
                        <p className="text-xs text-gray-500 mt-1">{fieldHints[key]}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Анализ соцсетей */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Анализ социальных сетей</h3>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="vkProfile" className="text-sm font-medium text-gray-700">
                        Ссылка на профиль ВКонтакте
                      </Label>
                      <Input
                        id="vkProfile"
                        value={reportData.vkProfile}
                        onChange={(e) => updateField('vkProfile', e.target.value)}
                        className="mt-1"
                        placeholder="https://vk.com/..."
                      />
                      <p className="text-xs text-gray-500 mt-1">{fieldHints.vkProfile}</p>
                    </div>
                    
                    <div>
                      <Label htmlFor="vkAnalysis" className="text-sm font-medium text-gray-700">
                        Анализ профиля ВКонтакте
                      </Label>
                      <Textarea
                        id="vkAnalysis"
                        value={reportData.vkAnalysis}
                        onChange={(e) => updateField('vkAnalysis', e.target.value)}
                        className="mt-1 min-h-[120px]"
                      />
                      <p className="text-xs text-gray-500 mt-1">{fieldHints.vkAnalysis}</p>
                    </div>
                    
                    <div>
                      <Label htmlFor="telegramId" className="text-sm font-medium text-gray-700">
                        ID Telegram аккаунта
                      </Label>
                      <Input
                        id="telegramId"
                        value={reportData.telegramId}
                        onChange={(e) => updateField('telegramId', e.target.value)}
                        className="mt-1"
                        placeholder="@username или ID"
                      />
                      <p className="text-xs text-gray-500 mt-1">{fieldHints.telegramId}</p>
                    </div>
                    
                    <div>
                      <Label htmlFor="telegramAnalysis" className="text-sm font-medium text-gray-700">
                        Анализ аккаунта Telegram
                      </Label>
                      <Textarea
                        id="telegramAnalysis"
                        value={reportData.telegramAnalysis}
                        onChange={(e) => updateField('telegramAnalysis', e.target.value)}
                        className="mt-1 min-h-[120px]"
                      />
                      <p className="text-xs text-gray-500 mt-1">{fieldHints.telegramAnalysis}</p>
                    </div>
                  </div>
                </div>

                {/* Заключение */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Заключение</h3>
                  <div>
                    <Label htmlFor="conclusion" className="text-sm font-medium text-gray-700">
                      Заключение по результатам проверки
                    </Label>
                    <Textarea
                      id="conclusion"
                      value={reportData.conclusion}
                      onChange={(e) => updateField('conclusion', e.target.value)}
                      className="mt-1 min-h-[120px]"
                    />
                    <p className="text-xs text-gray-500 mt-1">{fieldHints.conclusion}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Index;