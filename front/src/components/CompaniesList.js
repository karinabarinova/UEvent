import styled from 'styled-components';
import Company from './Company';


const ProductListStyles = styled.div`
    margin: 2rem;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 60px;
`;

function CompaniesList({companies}) {
    console.log('companies list', companies)

	let data = <h1>No companies found</h1>
	if (companies && companies.length) {
		data = companies.map((company, i) => {
            return <Company key={company.id} company={company}/>
        }) 
	}

	return (
        <div style={{textAlign: 'center'}}>
            <h1>Your companies</h1>
            <ProductListStyles>
                {data}
            </ProductListStyles>
        </div>
    )
}

export default CompaniesList;
