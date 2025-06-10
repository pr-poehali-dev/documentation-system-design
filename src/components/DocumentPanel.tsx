import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";

interface DocumentType {
  id: string;
  name: string;
  icon: string;
  count: number;
  status: string;
  color: string;
}

const DocumentPanel = () => {
  const documentTypes: DocumentType[] = [
    {
      id: "drawings",
      name: "Чертежи",
      icon: "FileImage",
      count: 1247,
      status: "active",
      color: "bg-blue-500",
    },
    {
      id: "specifications",
      name: "Спецификации",
      icon: "FileText",
      count: 856,
      status: "active",
      color: "bg-green-500",
    },
    {
      id: "technical",
      name: "Тех. условия",
      icon: "FileCheck",
      count: 423,
      status: "review",
      color: "bg-orange-500",
    },
    {
      id: "standards",
      name: "Стандарты",
      icon: "Shield",
      count: 189,
      status: "approved",
      color: "bg-purple-500",
    },
    {
      id: "manuals",
      name: "Руководства",
      icon: "Book",
      count: 78,
      status: "draft",
      color: "bg-cyan-500",
    },
    {
      id: "reports",
      name: "Отчеты",
      icon: "BarChart3",
      count: 234,
      status: "active",
      color: "bg-indigo-500",
    },
  ];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      active: { label: "Активно", variant: "default" as const },
      review: { label: "На проверке", variant: "secondary" as const },
      approved: { label: "Утверждено", variant: "outline" as const },
      draft: { label: "Черновик", variant: "destructive" as const },
    };

    return (
      statusConfig[status as keyof typeof statusConfig] || statusConfig.active
    );
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Типы Конструкторских Документов
        </h2>
        <p className="text-gray-600">
          Классификация и статистика документооборота
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {documentTypes.map((docType) => {
          const statusBadge = getStatusBadge(docType.status);

          return (
            <Card
              key={docType.id}
              className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer border-l-4"
              style={{ borderLeftColor: docType.color.replace("bg-", "#") }}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div
                    className={`w-10 h-10 ${docType.color} rounded-lg flex items-center justify-center`}
                  >
                    <Icon
                      name={docType.icon as any}
                      size={20}
                      className="text-white"
                    />
                  </div>
                  <Badge variant={statusBadge.variant}>
                    {statusBadge.label}
                  </Badge>
                </div>
                <CardTitle className="text-lg font-semibold text-gray-800">
                  {docType.name}
                </CardTitle>
              </CardHeader>

              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-gray-700">
                    {docType.count.toLocaleString()}
                  </span>
                  <div className="flex items-center text-sm text-gray-500">
                    <Icon name="FileIcon" size={14} className="mr-1" />
                    документов
                  </div>
                </div>

                <div className="mt-3 w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${docType.color}`}
                    style={{
                      width: `${Math.min(100, (docType.count / 1500) * 100)}%`,
                    }}
                  ></div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center">
              <Icon name="TrendingUp" size={24} className="mr-3" />
              <div>
                <p className="text-blue-100">Общий объем</p>
                <p className="text-2xl font-bold">3,027</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center">
              <Icon name="CheckCircle" size={24} className="mr-3" />
              <div>
                <p className="text-green-100">Актуальных</p>
                <p className="text-2xl font-bold">2,736</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center">
              <Icon name="Clock" size={24} className="mr-3" />
              <div>
                <p className="text-orange-100">На проверке</p>
                <p className="text-2xl font-bold">291</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DocumentPanel;
