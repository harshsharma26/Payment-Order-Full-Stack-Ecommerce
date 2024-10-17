const stripe = require('../../config/stripe');
const userModel = require('../../models/userModel');

const paymentController = async (req, res) => {
    try {
        const { cartItems } = req.body;

        const user = await userModel.findOne({ _id: req.userId });

        const params = {
            submit_type: 'pay',
            mode: 'payment',
            payment_method_types: ['card'],
            billing_address_collection: 'auto',
            shipping_options: [
                {
                    shipping_rate: 'shr_1Q8bwQAmpj8iNY1F3QjTnqU2'
                }
            ],
            customer_email: user.email,
            metadata:{
                userId:req.userId
            },
            line_items: cartItems.map((item) => {
                return {
                    price_data: {
                        currency: 'inr',
                        product_data: {
                            name: item.productId.productName,
                            images: Array.isArray(item.productId.productImage)
                                ? item.productId.productImage // Use as is if it's an array
                                : [item.productId.productImage], // Wrap in array if it's not
                            metadata: {
                                productId: item.productId._id
                            }
                        },
                        unit_amount: item.productId.sellingPrice * 100 // Convert to paise
                    },
                    adjustable_quantity: {
                        enabled: true,
                        minimum: 1
                    },
                    quantity: item.quantity
                };
            }),
            success_url: `${process.env.FRONTEND_URL}/success`,
            cancel_url: `${process.env.FRONTEND_URL}/cancel`
        };

        const session = await stripe.checkout.sessions.create(params);

        res.status(303).json(session);
    } catch (err) {
        res.json({
            message: err?.message || err,
            error: true,
            success: false
        });
    }
};

module.exports = paymentController;
