import React from "react";
import SystemDiagram from "@/components/SystemDiagram";
import DocumentPanel from "@/components/DocumentPanel";
import DataFlowChart from "@/components/DataFlowChart";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-blue-50">
      <div className="container mx-auto py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            ИС Конструкторской Документации
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Комплексная система управления техническими документами и процессами
            проектирования
          </p>
        </div>

        <Tabs defaultValue="architecture" className="w-full">
          <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto mb-8">
            <TabsTrigger value="architecture">Архитектура</TabsTrigger>
            <TabsTrigger value="documents">Документы</TabsTrigger>
            <TabsTrigger value="workflow">Процессы</TabsTrigger>
          </TabsList>

          <TabsContent value="architecture" className="w-full">
            <SystemDiagram />
          </TabsContent>

          <TabsContent value="documents" className="w-full">
            <DocumentPanel />
          </TabsContent>

          <TabsContent value="workflow" className="w-full">
            <DataFlowChart />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
