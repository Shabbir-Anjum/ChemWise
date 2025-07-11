import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const features = [
  {
    title: 'Microbe-Killer Advisor',
    description: 'Get expert guidance on effective antimicrobial chemicals, safe concentrations, and resistance prevention.',
    href: '/microbe',
    icon: '🦠',
    color: 'bg-blue-50 border-blue-200'
  },
  {
    title: 'DIY Product Formulator',
    description: 'Create safe chemical formulations with local ingredients and learn about safer substitutions.',
    href: '/formulate',
    icon: '🧼',
    color: 'bg-green-50 border-green-200'
  },
  {
    title: 'Green Chemistry Synthesis',
    description: 'Discover environmentally friendly synthesis routes with safer solvents and reagents.',
    href: '/green-synthesis',
    icon: '🌱',
    color: 'bg-emerald-50 border-emerald-200'
  },
  {
    title: 'Lab Calculator & Tutor',
    description: 'Perform calculations and get step-by-step explanations for molarity, pH, and stoichiometry.',
    href: '/lab-calc',
    icon: '🧪',
    color: 'bg-purple-50 border-purple-200'
  }
];

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
          Welcome to <span className="text-[#0077B6]">ChemWise</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
          Your intelligent chemistry companion for safe experiments, formulations, and calculations. 
          Designed for students, hobbyists, and researchers worldwide.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="bg-[#0077B6] hover:bg-[#005E91] text-white">
            <Link href="/microbe">Get Started</Link>
          </Button>
          <Button size="lg" variant="outline" className="border-[#0077B6] text-[#0077B6] hover:bg-[#0077B6] hover:text-white">
            Learn More
          </Button>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {features.map((feature) => (
          <Card key={feature.title} className={`${feature.color} hover:shadow-lg transition-shadow duration-200`}>
            <CardHeader>
              <div className="flex items-center space-x-3">
                <span className="text-3xl">{feature.icon}</span>
                <CardTitle className="text-xl text-gray-900">{feature.title}</CardTitle>
              </div>
              <CardDescription className="text-gray-600">
                {feature.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full bg-[#0077B6] hover:bg-[#005E91] text-white">
                <Link href={feature.href}>
                  Try Now
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Info Section */}
      <div className="bg-white rounded-lg shadow-sm p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Safe, Accessible Chemistry Knowledge</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          ChemWise provides evidence-based chemical information with safety as our top priority. 
          No registration required - start exploring chemistry safely today.
        </p>
      </div>
    </div>
  );
}