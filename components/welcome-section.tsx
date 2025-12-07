import { Music, Users, Globe } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function WelcomeSection() {
  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Welcome to Our Musical Journey</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Welcome to Samhita Music Forum, where the timeless traditions of Hindustani classical music come alive through dedicated teaching and passionate learning. Nestled in the cultural heart of Sirsi, our institute has been nurturing musical talent and preserving the rich heritage of Indian classical music for years.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="hover-lift">
            <CardHeader className="text-center">
              <Music className="w-12 h-12 text-primary mx-auto mb-4" />
              <CardTitle>Traditional Teaching</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-center text-muted-foreground">
                Honoring the guru-shishya parampara while embracing modern teaching techniques for effective learning.
              </p>
            </CardContent>
          </Card>
          
          <Card className="hover-lift">
            <CardHeader className="text-center">
              <Users className="w-12 h-12 text-primary mx-auto mb-4" />
              <CardTitle>Expert Guidance</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-center text-muted-foreground">
                Learn from experienced gurus with years of practice and teaching expertise in classical music.
              </p>
            </CardContent>
          </Card>
          
          <Card className="hover-lift">
            <CardHeader className="text-center">
              <Globe className="w-12 h-12 text-primary mx-auto mb-4" />
              <CardTitle>Flexible Learning</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-center text-muted-foreground">
                Choose between online and offline classes with flexible scheduling to suit your lifestyle.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
