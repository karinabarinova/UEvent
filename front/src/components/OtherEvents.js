// import {GridContainer} from './styles/Grid';
import styled from 'styled-components';
import Divider from '@material-ui/core/Divider';
import PriceTag from './styles/PriceTag'
import Tags from './styles/Tags'
import {Link} from 'react-router-dom';

const GridContainer = styled.div`
    display: grid;
    grid-template-rows: 1fr;
    grid-template-columns: 1fr 1fr;
    grid-gap: 2vw;
    background: lightgrey;
    
    div {
        font-size: 2vw;
        padding: .2em;
        text-align: center;
    }
`;

const ImageContainer = styled.div`
    position: relative;
`

export default function OtherEvents({otherEvents}) {
    let events = null;
    if (otherEvents?.length) {
        events = otherEvents.map((el, i) => {
            let arr = new Date(el.startDate).toString().split(' ')
            const remove = [6, 7, 8, 9];
    
            for (let i = remove.length - 1; i >= 0; i--)
                arr.splice(remove[i], 1);
    
            let time = arr[4].split(':');
            time.splice(2, 1);
            arr[4] = time.join(':');
            arr[5] = arr[5].replace(new RegExp("0", "g"), '')
            return (
                <GridContainer style={{margin: '2rem 0'}} key={i}>
                    <ImageContainer>
                        <img width="100%" src={el?.image ? el.image : '/defaultEventPage.jfif'} alt={el.name} />
                        <PriceTag>{el.price}$</PriceTag>

                        </ImageContainer>
                    <GridContainer>
                        <Tags><b>{el.theme} / {el.format}</b></Tags>
                        <Link to={`/event/${el.id}`}>{el.name}</Link>
                    </GridContainer>
                </GridContainer>
            )
        })
    }
    return (
        <div>
            <h2>Other events</h2>
            <div style={{border: '3px dashed red', padding: '2rem'}}>
                {events}
            </div>
            <Divider style={{color: 'black', fontWeight: 'bold'}} component='hr' />
        </div>
    )
}
