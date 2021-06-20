import styled from 'styled-components';

import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Product from './Product';

const ProductListStyles = styled.div`
    margin: 2rem;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 60px;
`;

function EventsList({events}) {

	let data = <h1>No events found</h1>
	if (events && events.length) {
		data =  events.map((event, i) => {
            return <Product key={event.id} product={event}/>
        }) 
	}

	return (
        <div style={{textAlign: 'center'}}>
            <h1>List of subscribed events</h1>
            <ProductListStyles>
                {data}
            </ProductListStyles>
        </div>
    )
}

export default EventsList;
