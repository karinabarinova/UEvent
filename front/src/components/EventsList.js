import styled from 'styled-components';
import Product from './Product';

const ProductListStyles = styled.div`
    margin: 2rem;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 60px;
`;

function EventsList({events}) {

	let data = null;
	if (events && events.length) {
		data =  events.map((event, i) => {
            return <Product key={event.id} product={event}/>
        }) 
	}

	return (
        <div style={{textAlign: 'center'}}>
            {data && (
                <>
                <h1>List of subscribed events</h1>
                <ProductListStyles>
                    {data}
                </ProductListStyles>
                </>
            )}
            
        </div>
    )
}

export default EventsList;
