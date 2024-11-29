'use client'

import { useState, useEffect, useCallback } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { StarIcon } from '@heroicons/react/24/solid'

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Grade 12 Student',
    content: 'The tutoring sessions at MSI have significantly improved my understanding of complex math concepts. I feel more confident in my abilities now.',
    image: '/images/testimonial1.jpg',
    rating: 5,
  },
  {
    name: 'Michael Lee',
    role: 'Parent of Grade 10 Student',
    content: 'My daughter\'s passion for science has grown tremendously since joining MSI\'s STEM camps. The hands-on experiments and engaging instructors have made a real difference.',
    image: '/images/testimonial2.jpg',
    rating: 5,
  },
  {
    name: 'Emily Nkosi',
    role: 'High School Teacher',
    content: 'As an educator, I\'ve seen firsthand how MSI\'s workshops complement our school curriculum. They bring science to life in ways that inspire our students.',
    image: '/images/testimonial3.jpg',
    rating: 5,
  },
]

const Testimonials = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true,
    dragFree: true,
    align: 'center',
    containScroll: 'trimSnaps'
  })
  const [selectedIndex, setSelectedIndex] = useState(0)

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    emblaApi.on('select', onSelect)
    emblaApi.on('reInit', onSelect)
  }, [emblaApi, onSelect])

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">What Our Community Says</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover how MSI is making a difference in our community through the words of our students, parents, and educators.
          </p>
        </div>

        {/* Carousel */}
        <div className="embla overflow-hidden max-w-7xl mx-auto" ref={emblaRef}>
          <div className="embla__container flex">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index} 
                className="flex-[0_0_100%] min-w-0 md:flex-[0_0_50%] lg:flex-[0_0_33.33%] px-4 py-4"
              >
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative bg-white rounded-2xl shadow-lg p-8 h-full transform hover:-translate-y-2 transition-all duration-300 hover:shadow-xl"
                >
                  {/* Quote Icon */}
                  <div className="absolute -top-4 right-8">
                    <div className="bg-red-500 rounded-full p-2 shadow-lg">
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="w-6 h-6 text-white transform rotate-180" 
                        viewBox="0 0 24 24" 
                        fill="currentColor"
                      >
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                      </svg>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="relative">
                    {/* Rating */}
                    <div className="flex mb-6">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <StarIcon key={i} className="w-5 h-5 text-yellow-400" />
                      ))}
                    </div>

                    {/* Quote */}
                    <blockquote className="text-gray-700 text-lg mb-8 leading-relaxed">
                      "{testimonial.content}"
                    </blockquote>

                    {/* Author */}
                    <div className="flex items-center mt-auto">
                      <div className="relative w-14 h-14 mr-4">
                        <Image 
                          src={testimonial.image} 
                          alt={testimonial.name}
                          fill
                          className="rounded-full object-cover ring-4 ring-red-50"
                        />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900">{testimonial.name}</h3>
                        <p className="text-red-600 text-sm">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center mt-10 space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`transition-all duration-300 ${
                selectedIndex === index 
                  ? 'w-8 bg-red-600' 
                  : 'w-2 bg-gray-300 hover:bg-gray-400'
              } h-2 rounded-full`}
              onClick={() => emblaApi?.scrollTo(index)}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials
