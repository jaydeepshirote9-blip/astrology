import React, { useState } from 'react'
import { Heart, DollarSign, Users, Briefcase, Target, Brain, Zap, Shield } from 'lucide-react'
import FrameworkVisualization from '../components/three/FrameworkVisualization'
import CosmicBackground from '../components/three/CosmicBackground'
import WebGLErrorBoundary from '../components/WebGLErrorBoundary'
import { useScrollAnimation, useTextRevealAnimation, useCounterAnimation, useStaggerRevealAnimation, useTextMorphAnimation } from '../hooks/useAnimations'

const Framework = () => {
  const [activeSection, setActiveSection] = useState(null)
  
  const heroRef = useScrollAnimation('fadeIn')
  const titleRef = useTextMorphAnimation(0.2)
  const statsRef = useStaggerRevealAnimation('.stat-card')
  const pillarsRef = useStaggerRevealAnimation('.pillar-card', { start: "top 70%" })
  const philosophyRef = useScrollAnimation('slideInLeft', { start: "top 75%" })
  
  const counter1Ref = useCounterAnimation(1000, 2)
  const counter2Ref = useCounterAnimation(95, 1.5)
  const counter3Ref = useCounterAnimation(500, 2.5)

  const pillars = [
    {
      icon: Heart,
      title: "Health & Wellness",
      color: "text-sage-green",
      bgColor: "bg-sage-green/10",
      description: "Physical vitality, mental clarity, and emotional balance form the foundation of a fulfilling life.",
      aspects: ["Physical Fitness", "Mental Health", "Emotional Balance", "Spiritual Connection"],
      swotFocus: "Strength-based wellness optimization"
    },
    {
      icon: DollarSign,
      title: "Wealth & Abundance",
      color: "text-golden-wisdom",
      bgColor: "bg-golden-wisdom/10",
      description: "Financial freedom and abundance mindset that supports your life goals and aspirations.",
      aspects: ["Financial Planning", "Investment Strategy", "Abundance Mindset", "Career Growth"],
      swotFocus: "Opportunity-driven wealth building"
    },
    {
      icon: Users,
      title: "Relationships",
      color: "text-sacred-rose",
      bgColor: "bg-sacred-rose/10",
      description: "Meaningful connections, love, and supportive relationships that enrich your life journey.",
      aspects: ["Family Bonds", "Romantic Partnership", "Friendships", "Professional Networks"],
      swotFocus: "Strength-based relationship building"
    },
    {
      icon: Briefcase,
      title: "Career & Purpose",
      color: "text-celestial-blue",
      bgColor: "bg-celestial-blue/10",
      description: "Purposeful work, professional growth, and alignment with your life's mission.",
      aspects: ["Career Development", "Skill Building", "Leadership", "Life Purpose"],
      swotFocus: "Threat mitigation and opportunity leverage"
    }
  ]

  return (
    <div className="min-h-screen pt-20 cosmic-bg relative">
      <WebGLErrorBoundary>
        <CosmicBackground intensity={0.6} />
      </WebGLErrorBoundary>
      
      {/* Hero Section */}
      <div ref={heroRef} className="section-container">
        <div className="text-center mb-16">
          <h1 ref={titleRef} className="heading-hero text-cosmic-contrast mb-6">
            The Roadmap to an Enriched Life
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Discover our comprehensive framework for achieving balance and fulfillment 
            in all areas of your life through self-awareness and conscious living.
          </p>
          
          {/* Stats Section */}
          <div ref={statsRef} className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="card-cosmic text-center stat-card">
              <div ref={counter1Ref} className="text-4xl font-heading font-bold text-cosmic">
                0
              </div>
              <p className="text-gray-600 mt-2">Lives Transformed</p>
            </div>
            <div className="card-cosmic text-center stat-card">
              <div className="text-4xl font-heading font-bold text-cosmic">
                <span ref={counter2Ref}>0</span>%
              </div>
              <p className="text-gray-600 mt-2">Success Rate</p>
            </div>
            <div className="card-cosmic text-center stat-card">
              <div ref={counter3Ref} className="text-4xl font-heading font-bold text-cosmic">
                0
              </div>
              <p className="text-gray-600 mt-2">Reports Generated</p>
            </div>
          </div>
        </div>

        {/* 3D Framework Visualization */}
        <div className="mb-20">
          <h2 className="heading-section text-center text-cosmic mb-8">
            Interactive Framework Model
          </h2>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-cosmic">
            <WebGLErrorBoundary>
              <FrameworkVisualization activeSection={activeSection} />
            </WebGLErrorBoundary>
            <p className="text-center text-gray-600 mt-4">
              Click and drag to explore • Hover over pillars for details
            </p>
          </div>
        </div>

        {/* Four Pillars Section */}
        <div ref={pillarsRef} className="mb-20">
          <h2 className="heading-section text-center text-cosmic mb-12">
            The Four Pillars of Life
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {pillars.map((pillar, index) => (
              <div
                key={index}
                className="card-cosmic group cursor-pointer transition-all duration-300 pillar-card"
                onMouseEnter={() => setActiveSection(pillar.title.split(' ')[0])}
                onMouseLeave={() => setActiveSection(null)}
              >
                <div className="flex items-start space-x-4">
                  <div className={`${pillar.bgColor} p-4 rounded-xl`}>
                    <pillar.icon className={`w-8 h-8 ${pillar.color}`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="heading-subsection text-cosmic mb-3">
                      {pillar.title}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {pillar.description}
                    </p>
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      {pillar.aspects.map((aspect, aspectIndex) => (
                        <div
                          key={aspectIndex}
                          className="text-sm text-gray-500 flex items-center"
                        >
                          <div className={`w-2 h-2 rounded-full ${pillar.color.replace('text-', 'bg-')} mr-2`} />
                          {aspect}
                        </div>
                      ))}
                    </div>
                    <div className={`${pillar.bgColor} p-3 rounded-lg`}>
                      <p className="text-sm font-medium text-gray-700">
                        <strong>SWOT Focus:</strong> {pillar.swotFocus}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Philosophy Section */}
        <div ref={philosophyRef} className="mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="heading-section text-cosmic mb-6">
                Our Philosophy
              </h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-cosmic-purple/10 p-3 rounded-xl">
                    <Target className="w-6 h-6 text-cosmic-purple" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-lg mb-2">
                      Holistic Integration
                    </h3>
                    <p className="text-gray-600">
                      True fulfillment comes from balancing all four pillars simultaneously, 
                      not focusing on just one area.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-golden-wisdom/10 p-3 rounded-xl">
                    <Brain className="w-6 h-6 text-golden-wisdom" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-lg mb-2">
                      Self-Awareness First
                    </h3>
                    <p className="text-gray-600">
                      Understanding your strengths, weaknesses, opportunities, and threats 
                      is the foundation of all growth.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-celestial-blue/10 p-3 rounded-xl">
                    <Zap className="w-6 h-6 text-celestial-blue" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-lg mb-2">
                      Action-Oriented Growth
                    </h3>
                    <p className="text-gray-600">
                      Knowledge without action is powerless. Our framework provides 
                      clear, actionable steps for transformation.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-sacred-rose/10 p-3 rounded-xl">
                    <Shield className="w-6 h-6 text-sacred-rose" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-lg mb-2">
                      Sustainable Development
                    </h3>
                    <p className="text-gray-600">
                      Lasting change requires sustainable practices that align with 
                      your authentic self and life circumstances.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-cosmic-purple/5 to-golden-wisdom/5 p-8 rounded-2xl">
              <h3 className="heading-subsection text-cosmic mb-6 text-center">
                Framework Benefits
              </h3>
              <div className="space-y-4">
                <div className="bg-white/60 backdrop-blur-sm p-4 rounded-xl">
                  <h4 className="font-semibold text-cosmic mb-2">Personalized Insights</h4>
                  <p className="text-sm text-gray-600">
                    Every recommendation is tailored to your unique numerological profile
                  </p>
                </div>
                <div className="bg-white/60 backdrop-blur-sm p-4 rounded-xl">
                  <h4 className="font-semibold text-cosmic mb-2">Measurable Progress</h4>
                  <p className="text-sm text-gray-600">
                    Track your growth with clear metrics and milestones
                  </p>
                </div>
                <div className="bg-white/60 backdrop-blur-sm p-4 rounded-xl">
                  <h4 className="font-semibold text-cosmic mb-2">Ongoing Support</h4>
                  <p className="text-sm text-gray-600">
                    Continuous guidance and updates as you evolve and grow
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="card-cosmic max-w-2xl mx-auto">
            <h2 className="heading-subsection text-cosmic mb-4">
              Ready to Transform Your Life?
            </h2>
            <p className="text-gray-600 mb-6">
              Get your personalized numerology-based self-awareness report and start 
              your journey toward a more enriched and balanced life.
            </p>
            <button className="btn-primary">
              Get Your Personal Report - ₹99
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Framework
