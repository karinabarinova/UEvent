import styled from 'styled-components';
import Company from './Company';


const ProductListStyles = styled.div`
    margin: 2rem;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 60px;
`;

function CompaniesList({companies}) {
	let data = null;
	if (companies && companies.length) {
		data = companies.map((company, i) => {
            return <Company key={company.id} company={company} account={true}/>
        }) 
	}

	return (
        <div style={{textAlign: 'center'}}>
            {data && (
                <>
                    <h1>My companies</h1>
                    <ProductListStyles>
                        {data}
                    </ProductListStyles>
                </>
            )}
        </div>
    )
}

export default CompaniesList;
