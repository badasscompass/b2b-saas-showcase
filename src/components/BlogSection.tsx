import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ExternalLink, BookOpen } from "lucide-react";
export const BlogSection = () => {
  return <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <div className="p-3 bg-[#EA3E3A]/10 rounded-full">
              <BookOpen className="h-12 w-12 text-[#EA3E3A]" />
            </div>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold font-manrope text-gray-900 mb-6">Insights from our Product Lead</h2>
          
          <p className="text-lg md:text-xl text-gray-600 font-manrope mb-8 leading-relaxed">
            Get strategic product insights, lessons learned, and practical frameworks from 9+ years of product leadership experience.
          </p>

          <Card className="border-2 border-[#EA3E3A]/20 bg-gradient-to-br from-[#EA3E3A]/5 to-[#F4A42C]/5 max-w-2xl mx-auto">
            <CardHeader className="p-8">
              <div className="flex items-center justify-center gap-2 mb-4">
                <img src="/lovable-uploads/lmn3_logo_bullet.png" alt="LMN3 Logo - Iva Rumora Blog" className="w-8 h-8" />
                <CardTitle className="font-manrope text-xl text-gray-900">Product Leadership Monthly</CardTitle>
              </div>
              
              <CardDescription className="text-gray-600 font-manrope mb-6 text-base">Monthly newsletter on product strategy, UX, and building products that scale. </CardDescription>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-[#EA3E3A] hover:bg-[#F4A42C] text-white font-manrope" asChild>
                  <a href="https://irumora.substack.com/" target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Read Latest Posts
                  </a>
                </Button>
                
                <Button variant="outline" className="border-[#EA3E3A] text-[#EA3E3A] hover:bg-[#EA3E3A] hover:text-white font-manrope" asChild>
                  <a href="https://irumora.substack.com/subscribe" target="_blank" rel="noopener noreferrer">
                    Subscribe for Free
                  </a>
                </Button>
              </div>
            </CardHeader>
          </Card>
        </div>
      </div>
    </section>;
};