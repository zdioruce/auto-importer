
import { numberWithCommas, convertFloatTo2Decimal } from 'util/function'

export const getMetaFields = (product) => {
    const fee = (product.buyBoxPrice) * product.fee / 100 - product.pickAndPackFee

    let metafield_values = {
        asin: product.asin,
        barcode: product.barcode,
        rating: product.rating,
        reviewCount: numberWithCommas(product.reviewCount),
        quantity: product.quantity,
        minOrder: product.minOrder,
        buyBoxPrice: convertFloatTo2Decimal(product.buyBoxPrice), 
        unitCost: convertFloatTo2Decimal(product.unitCost),
        fee: convertFloatTo2Decimal(fee),
        netProfitPerUnit: convertFloatTo2Decimal(product.netProfitPerUnit),
        netProceeds: convertFloatTo2Decimal(product.netProceeds),
        dealProfit: numberWithCommas(convertFloatTo2Decimal(product.dealProfit)),
        netProfitPerUnitPercent: convertFloatTo2Decimal(product.netProfitPerUnitPercent)
    }

    return metafield_values
}