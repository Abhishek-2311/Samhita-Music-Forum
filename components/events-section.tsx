export default function EventsSection() {
  const events = [
    {
      id: 1,
      title: 'Monthly Recital Series',
      date: 'Every 1st Sunday',
      time: '6:00 PM - 8:00 PM',
      location: 'Samhita Main Hall, Sirsi',
      description: 'Our students showcase their learning through traditional performances.',
    },
    {
      id: 2,
      title: 'Guru\'s Special Workshop',
      date: 'January 15, 2024',
      time: '10:00 AM - 5:00 PM',
      location: 'Online & Offline',
      description: 'Intensive training in advanced raag interpretation with our master musicians.',
    },
    {
      id: 3,
      title: 'Spring Music Festival',
      date: 'March 1-7, 2024',
      time: 'Various Times',
      location: 'Sirsi Community Center',
      description: 'A week-long celebration of classical music with performances, workshops, and competitions.',
    },
  ]

  return (
    <section id="events" className="py-20 px-4 sm:px-6 lg:px-8 bg-card">
      <div className="max-w-7xl mx-auto">
        <div className="space-y-12">
          {/* Header */}
          <div className="space-y-4 text-center">
            <p className="text-primary font-medium text-sm uppercase tracking-wider">Upcoming</p>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-balance">
              Workshops & Events
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Join us for special sessions, recitals, and festivals
            </p>
          </div>

          {/* Events Timeline */}
          <div className="space-y-6">
            {events.map((event) => (
              <div
                key={event.id}
                className="flex gap-6 p-6 border border-accent-light rounded-xl hover:shadow-md transition-all"
              >
                <div className="flex-shrink-0 w-16 h-16 bg-gradient-accent rounded-lg flex items-center justify-center">
                  <div className="text-white text-center text-sm font-bold">{event.id}</div>
                </div>

                <div className="flex-grow">
                  <h3 className="text-xl font-serif font-bold text-foreground">{event.title}</h3>
                  <p className="text-muted-foreground text-sm mt-1">{event.description}</p>

                  <div className="grid md:grid-cols-3 gap-4 mt-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Date</p>
                      <p className="font-medium text-foreground">{event.date}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Time</p>
                      <p className="font-medium text-foreground">{event.time}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Location</p>
                      <p className="font-medium text-foreground">{event.location}</p>
                    </div>
                  </div>
                </div>

                <button className="hidden sm:flex items-center justify-center px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all font-medium text-sm flex-shrink-0 h-fit">
                  Register
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
