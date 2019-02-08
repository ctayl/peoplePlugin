"use strict";

var bookmarks = {
    add: function add($scope, item, controller) {
        var options = {
            id: item.id,
            title: item.fName + ' ' + item.lName,
            payload: {link: item.id},
            icon: item.topImage
        };
        var callback = function callback(err, data) {
            if (err) throw err;
            if (controller === 'WidgetHome') {
                $scope.WidgetHome.items.map(function (i) {
                    var isBookmarked = i.id === item.id;
                    if (isBookmarked) {
                        i.bookmarked = true;
                    }
                });
            } else if (controller === 'WidgetPeople') {
                $scope.WidgetPeople.item.bookmarked = true;
            }
            if (!$scope.$$phase) {
                $scope.$apply();
            }
        };
        buildfire.bookmarks ? buildfire.bookmarks.add(options, callback) : null;
    },
    delete: function _delete($scope, item, controller) {
        var callback = function callback() {
            if (controller === 'WidgetHome') {
                $scope.WidgetHome.items.map(function (i) {
                    var isBookmarked = i.id === item.id;
                    if (isBookmarked) {
                        i.bookmarked = false;
                    }
                });
            } else if (controller === 'WidgetPeople') {
                $scope.WidgetPeople.item.bookmarked = false;
            }
            if (!$scope.$$phase) {
                $scope.$apply();
            }
        };
        buildfire.bookmarks ? buildfire.bookmarks.delete(item.id, callback) : null;
    },
    _getAll: function _getAll(callback) {
        var cb = function cb(err, bookmarks) {
            if (err) throw err;
            callback(bookmarks);
        };
        buildfire.bookmarks ? buildfire.bookmarks.getAll(cb) : cb(null, []);
    },
    sync: function sync($scope, controller) {
        this._getAll(function (bookmarks) {
            console.log(bookmarks);

            var bookmarkIds = [];
            bookmarks.forEach(function (bookmark) {
                bookmarkIds.push(bookmark.id);
            });


            if (controller === 'WidgetHome') {
                console.log('WidgetHome');
                
                $scope.WidgetHome.items && $scope.WidgetHome.items.map(function (item) {
                    var isBookmarked = bookmarkIds.includes(item.id);
                    if (isBookmarked) {
                        item.bookmarked = true;
                    } else {
                        item.bookmarked = false;
                    }
                });
            } else if (controller === 'WidgetPeople') {
                console.log('WidgetPeople');

                var isBookmarked = bookmarkIds.includes($scope.WidgetPeople.item.id);
                if (isBookmarked) {
                    $scope.WidgetPeople.item.bookmarked = true;
                } else {
                    $scope.WidgetPeople.item.bookmarked = false;
                }
            }
            if (!$scope.$$phase) {
                $scope.$apply();
            }
        });
    }
};