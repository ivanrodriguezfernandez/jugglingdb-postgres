var jdb = require('jugglingdb'),
    Schema = jdb.Schema,
    test = jdb.test,
    schema = new Schema(__dirname + '/..', {
        database:'myapp_test',
        username:'postgres'
    });

test(module.exports, schema);


test.it('all should support regex', function (test) {
    Post = schema.models.Post;

    Post.destroyAll(function () {
        Post.create({title:'Postgres Test Title'}, function (err, post) {
            var id = post.id
            Post.all({where:{title:/^Postgres/}}, function (err, post) {
                test.ok(!err);
                test.ok(post[0].id == id);
                test.done();
            });
        });
    });
});

test.it('all should support arbitrary expressions', function (test) {
    Post.destroyAll(function () {
        Post.create({title:'Postgres Test Title'}, function (err, post) {
            var id = post.id
            Post.all({where:{title:{ilike:'postgres%'}}}, function (err, post) {
                test.ok(!err);
                test.ok(post[0].id == id);
                test.done();
            });
        });
    });
})

test.it('all should support like operator ', function (test) {
    Post = schema.models.Post;
    Post.destroyAll(function () {
        Post.create({title:'Postgres Test Title'}, function (err, post) {
            var id = post.id
            Post.all({where:{title:{like:'%Test%'}}}, function (err, post) {
                test.ok(!err);
                test.ok(post[0].id == id);
                test.done();
            });
        });
    });
});

test.it('all should support \'not like\' operator ', function (test) {
    Post = schema.models.Post;
    Post.destroyAll(function () {
        Post.create({title:'Postgres Test Title'}, function (err, post) {
            var id = post.id
            Post.all({where:{title:{nlike:'%Test%'}}}, function (err, post) {
                test.ok(!err);
                test.ok(post.length===0);
                test.done();
            });
        });
    });
});
test.it('all should support NULL expression', function (test) {
    Post = schema.models.Post;
    Post.destroyAll(function () {
        Post.create({title:'Postgres Test NULL'}, function (err, post) {
            var id = post.id
            Post.all({where:{subject:null}}, function (err, post) {
                test.ok(!err);
                test.ok(post[0].id == id);
                test.done();
            });
        });
    });
})
