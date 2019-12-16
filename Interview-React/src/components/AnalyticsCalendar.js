import React from 'react'
import { ResponsiveCalendar } from '@nivo/calendar'
import '../index.css'

class AnalyticsCalendar extends React.Component {

    render() {
        var currentDate = new Date().toJSON().slice(0,10);
        return (
            <div className="chart">
                <ResponsiveCalendar
                    data={this.props.data}
                    from="2019-01-01"
                    to={currentDate}
                    emptyColor="#eeeeee"
                    colors={[ '#61cdbb', '#97e3d5', '#e8c1a0', '#f47560' ]}
                    margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
                    yearSpacing={40}
                    monthBorderColor="#ffffff"
                    dayBorderWidth={2}
                    dayBorderColor="#ffffff"
                    legends={[
                        {
                            anchor: 'bottom-right',
                            direction: 'row',
                            translateY: 36,
                            itemCount: 4,
                            itemWidth: 42,
                            itemHeight: 36,
                            itemsSpacing: 14,
                            itemDirection: 'right-to-left'
                        }
                    ]}
                />
            </div>
        );
    };
}

export default AnalyticsCalendar



