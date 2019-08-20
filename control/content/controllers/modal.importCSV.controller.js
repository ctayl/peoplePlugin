'use strict';

(function (angular) {
    angular
        .module('peoplePluginContent')
        .controller('ImportCSVPopupCtrl', ['$scope', '$modalInstance', '$csv', function ($scope, $modalInstance, FormatConverter) {
            var ImportCSVPopup = this;
            var header = ["topImage", "fName", "lName", "email", "position", "bodyContent", "phoneNumber"];
            ImportCSVPopup.ok = function () {
                if (ImportCSVPopup.fileData) {
                    var json = JSON.parse(FormatConverter.csvToJson(ImportCSVPopup.fileData, { header: header }));
                    var index, value;
                    for (var index = 0; index < json.length; index++) {
                        value = json[index];
                    }
                    $modalInstance.close(json);
                }
                else {
                    $modalInstance.close();
                }
            };
            ImportCSVPopup.cancel = function () {
                $modalInstance.dismiss('Dismiss');
            };
        }])
})(window.angular);
