import styled from 'styled-components';
import PriceTag from './styles/PriceTag'
import Tags from './styles/Tags'
import {Link} from 'react-router-dom';
import { Divider, Grid, Paper } from "@material-ui/core";

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
                <div key={i}>
                    <Paper style={{ padding: "40px 20px" }}>
                        <Grid container wrap="nowrap" spacing={10}>
                            <Grid item>
                                <ImageContainer>
                                    <img width="300px" src={el?.image ? el.image : '/defaultEventPage.jfif'} alt={el.name} />
                                    <PriceTag>{el.price}$</PriceTag>
                                </ImageContainer>
                            </Grid>
                            <Grid justifyContent="center" item xs zeroMinWidth>
                                <Tags><b>{el.theme} / {el.format}</b></Tags>
                                <Grid justifyContent="center" item xs zeroMinWidth>
                                    <Link to={`/event/${el.id}`}>{el.name}</Link>
                                    <p>{el.description}</p>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Paper>
                    <Divider />
                </div>
                
            )
        })
    }
    return (
        <div>
            <h2>Other events</h2>
            <div>
                {events}
            </div>
        </div>
    )
}
