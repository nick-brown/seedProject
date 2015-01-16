module.exports = function(router, app, models) {
    'use strict';

    // middleware to use for all requests
    router.use(function(req, res, next) {
        // do logging
        console.log("method: %s\nurl: %s\npath: %s", req.method, req.url, req.path);
        console.log("body:"); 
        console.log(req.body);

        next(); // make sure we go to the next routes and don't stop here
    });

    // prefix all routes with /api
    app.use('/api', router);

    router.route('/products')

        // create a product (accessed at POST http://localhost:8080/api/products)
        .post(function(req, res) {
            // Create a new product using values from the request body
            var product = new models.Product({
                name: req.body.name,
                description: req.body.description,
                price: req.body.price,
                category: req.body.category
            }); 		

            // save the product and check for errors
            product.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'Product created!', doc: product });
            });
        })

        .get(function(req, res) {
            models.Product.find(function(err, products) {
                if(err)
                    res.send(err);

                res.json(products);
            });
        });


    router.route('/products/:product_id')
        .get(function(req, res) {
            models.Product.findById(req.params.product_id, function(err, product) {
                if(err)
                    res.send(err);

                res.json(product);
            });
        })

        .put(function(req, res) {
            models.Product.findById(req.params.product_id, function(err, product) {
                if(err)
                    res.send(err);

                product.name = req.body.name || product.name;
                product.category = req.body.category || product.category;
                product.price = req.body.price || product.price;
                product.description = req.body.description || product.description;
                product.updated = Date.now();

                product.save(function(err) {
                    if(err)
                        res.send(err);

                    res.json({ message: 'Product updated successfully', doc: product });
                });
            });
        })

        .delete(function(req, res) {
            models.Product.remove({
                _id: req.params.product_id
            }, function(err) {
                if(err)
                    res.send(err);

                res.json({ message: "Deleted product with id: " + req.params.product_id });
            });
        });

};
