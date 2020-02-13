const require = ('./auth.js');
const express = ('express')

router.route("/order/")
    .post(auth.verifyUser, async (req, res) => {
        const {
            foodName,
            quantity,
            price
        } = req.body;

        const userId = req.user._id;
        try {
            let order = await Order.findOne({
                users: userId
            });
            if (order) {
                let itemIndex = order.foods.findIndex(p => p.foodId == foodId);
                if (itemIndex > -1) {
                    let orerItem = order.foods[itemIndex];
                    orerItem.quantity = quantity;
                    order.foods[itemIndex] = orerItem;
                } else {
                    order.foods.push({
                        foodName,
                        quantity,
                        price
                    });
                }
                order = await order.save();
                return res.status(201).send(order);
            } else {
                const newOrder = await Order.create({
                    users: userId,
                    foods: [{
                        foodName,
                        quantity,
                        price
                    }],
                    
                });
                return res.status(201).send(newOrder);
            }
        } catch (err) {
            console.log(err);
            res.status(500).send({
                status: "Something went wrong"
            });
        }
    })