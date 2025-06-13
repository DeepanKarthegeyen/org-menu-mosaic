
import React from 'react';
import { Company } from '../types/company';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface CompanySelectorProps {
  companies: Company[];
  onCompanySelect: (company: Company) => void;
}

const CompanySelector: React.FC<CompanySelectorProps> = ({ companies, onCompanySelect }) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">Select Your Organization</h1>
        <p className="text-xl text-muted-foreground">Choose your company to access your customized workspace</p>
      </div>
      
      <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {companies.map((company) => (
          <Card key={company.id} className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="text-2xl">{company.name}</CardTitle>
              <CardDescription className="text-lg">{company.domain}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 mb-4">
                <p className="font-semibold">Available Applications:</p>
                {company.remoteApps.map((app) => (
                  <div key={app.name} className="text-sm text-muted-foreground">
                    • {app.name}
                  </div>
                ))}
              </div>
              <Button 
                onClick={() => onCompanySelect(company)}
                className="w-full"
              >
                Access {company.name} Workspace
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CompanySelector;
