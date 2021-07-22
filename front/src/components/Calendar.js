import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import Typography from '@material-ui/core/Typography';
import timeGridPlugin from "@fullcalendar/timegrid";
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from '../store/products/productSlice';

const useStyles = makeStyles(theme => ({
	root: {
		'& a': {
			color: theme.palette.text.primary,
			textDecoration: 'normal!important'
		},
		'&  .fc-media-screen': {
			minHeight: '100%'
		},
		'& .fc-scrollgrid, & .fc-theme-standard td, & .fc-theme-standard th': {
			borderColor: `${theme.palette.divider}!important`
		},
		'&  .fc-scrollgrid-section > td': {
			border: 0
		},
		'& .fc-daygrid-day': {
			'&:last-child': {
				borderRight: 0
			}
		},
		'& .fc-col-header-cell': {
			borderWidth: '0 0 1px 0',
			padding: '16px 0',
			'& .fc-col-header-cell-cushion': {
				color: theme.palette.text.secondary,
				fontWeight: 500
			}
		},
		'& .fc-view ': {
			borderRadius: 20,
			overflow: 'hidden',
			border: `1px solid ${theme.palette.divider}`,
			'& > .fc-scrollgrid': {
				border: 0
			}
		},
		'& .fc-daygrid-day-number': {
			color: theme.palette.text.secondary,
			fontWeight: 500
		},
		'& .fc-event': {
			backgroundColor: `${theme.palette.primary.dark}`,
			color: `${theme.palette.primary.contrastText}!important`,
			border: 0,
			padding: '0 6px',
			borderRadius: '16px!important'
		}
	},
}));

function CalendarApp(props) {
    const classes = useStyles(props);
    const dispatch = useDispatch();
    const events = useSelector(({product}) => product.products.rows)

    useEffect(() => {
        dispatch(getAllProducts(1))
    }, []);

    function prepareEvents() {
        const eventsArr = [];
        for (let e in events) {
            let event = {
                start: events[e].startDate,
                title: events[e].name
            }
            eventsArr.push(event);
        }
        return eventsArr;
    }

    const renderEvents = prepareEvents()
    return (
        <div className={clsx(classes.root, 'flex flex-col flex-auto relative')}>
            <div className="flex flex-1 p-24 container">
                <div
                    className="w-full"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}
                >
		            <FullCalendar
		            	height={850}
		            	initialView="dayGridMonth" 
                        allDaySlot={false}
		            	nowIndicator={true}
		            	fixedWeekCount={false}
		            	weekNumbers={true}
		            	weekText="Week #"
		            	dayHeaders={true}
		            	dayHeaderFormat={{ month: 'short', day: 'numeric', omitCommas: true }
		            	}
		            	handleWindowResize={true}
		            	plugins={[dayGridPlugin, timeGridPlugin]}
		            	editable={true}
		            	headerToolbar={{
		            		left: "prev,next,today", 
		            		center: "title",
		            		right: "dayGridMonth,timeGridWeek,timeGridDay"
		            	}}
                        eventContent={renderEventContent}
		            	events={renderEvents}
		            />
                </div>
            </div>
        </div>
	)
}

function renderEventContent(eventInfo) {
	return (
		<div className="flex items-center">
			<Typography className="text-12 px-4 truncate">{eventInfo.event.title}</Typography>
            <Typography className="text-12 font-semibold">{eventInfo.timeText}</Typography>
		</div>
	);
}

export default CalendarApp;