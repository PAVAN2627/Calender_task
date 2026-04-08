import React from 'react';
import './PremiumCalendar.css';

const PremiumCalendar: React.FC = () => {
    // Dates for January 2022
    // Dec 27 - Jan 2nd is the first row
    // Jan 31st is the first day of the last row
    const days = [
        { date: 27, current: false }, { date: 28, current: false }, { date: 29, current: false }, { date: 30, current: false }, { date: 31, current: false }, { date: 1, current: true, weekend: true }, { date: 2, current: true, weekend: true },
        { date: 3, current: true }, { date: 4, current: true }, { date: 5, current: true }, { date: 6, current: true }, { date: 7, current: true }, { date: 8, current: true, weekend: true }, { date: 9, current: true, weekend: true },
        { date: 10, current: true }, { date: 11, current: true }, { date: 12, current: true }, { date: 13, current: true }, { date: 14, current: true }, { date: 15, current: true, weekend: true }, { date: 16, current: true, weekend: true },
        { date: 17, current: true }, { date: 18, current: true }, { date: 19, current: true }, { date: 20, current: true }, { date: 21, current: true }, { date: 22, current: true, weekend: true }, { date: 23, current: true, weekend: true },
        { date: 24, current: true }, { date: 25, current: true }, { date: 26, current: true }, { date: 27, current: true }, { date: 28, current: true }, { date: 29, current: true, weekend: true }, { date: 30, current: true, weekend: true },
        { date: 31, current: true }, { date: 1, current: false }, { date: 2, current: false }, { date: 3, current: false }, { date: 4, current: false }, { date: 5, current: false }, { date: 6, current: false }
    ];

    return (
        <div className="calendar-outer-container">
            <div className="calendar-spiral">
                {[...Array(15)].map((_, i) => (
                    <div key={i} className="spiral-ring"></div>
                ))}
            </div>
            
            <div className="premium-calendar-card">
                <div className="calendar-top-section">
                    <div className="hero-image-container">
                        <img 
                            src="https://images.unsplash.com/photo-1520262454473-a1a82276a574?auto=format&fit=crop&q=80&w=1200" 
                            alt="Climber on Mountain" 
                            className="hero-image"
                        />
                        <div className="geometric-overlay overlay-left"></div>
                        <div className="geometric-overlay overlay-right"></div>
                        <div className="month-year-label">
                            <span className="year">2022</span>
                            <span className="month">JANUARY</span>
                        </div>
                    </div>
                </div>

                <div className="calendar-bottom-section">
                    <div className="notes-column">
                        <h3 className="notes-title">Notes</h3>
                        <div className="notes-lines">
                            {[...Array(10)].map((_, i) => (
                                <div key={i} className="note-line"></div>
                            ))}
                        </div>
                    </div>

                    <div className="calendar-grid-column">
                        <div className="weekday-header">
                            <span>MON</span>
                            <span>TUE</span>
                            <span>WED</span>
                            <span>THU</span>
                            <span>FRI</span>
                            <span className="weekend-header">SAT</span>
                            <span className="weekend-header">SUN</span>
                        </div>
                        <div className="dates-grid">
                            {days.map((day, index) => (
                                <div 
                                    key={index} 
                                    className={`date-cell ${!day.current ? 'faded' : ''} ${day.weekend ? 'weekend-date' : ''}`}
                                >
                                    {day.date}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PremiumCalendar;
