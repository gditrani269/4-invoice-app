import PropTypes from 'prop-types'
export const RowItem = ({product, price, quantity}) => {
    return (
        <>
            <tr>
                <td>{ product }</td>
                <td>{ price }</td>
                <td>{ quantity }</td>
            </tr>
        
        </>
    )
}

RowItem.propTypes = {
    product: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired,
}

