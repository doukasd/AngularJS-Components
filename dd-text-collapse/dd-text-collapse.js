// a directive to auto-collapse long text
// in elements with the "dd-text-collapse" attribute
// example: <div dd-text-collapse dd-text-collapse-max-length="250" dd-text-collapse-text="{{it.description}}"  dd-text-collapse-escape="true" dd-text-collapse-nl2br="true"></div>
// default: escape text - turn off with dd-text-collapse-escape="false"
// default: newlines to <br> - turn off with dd-text-collapse-nl2br="false"
angular.module('ddTextCollapse', []).directive('ddTextCollapse', ['$compile', function($compile) {

    return {
        restrict: 'A',
        scope: true,
        link: function(scope, element, attrs) {

            // start collapsed
            scope.collapsed = false;
            
            // create the function to toggle the collapse
            scope.toggle = function() {
                scope.collapsed = !scope.collapsed;
            };


            scope.entityMap = {
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': '&quot;',
                "'": '&#39;',
                "/": '&#x2F;'
            };

            scope.escapeHtml = function(string) {
                return String(string).replace(/[&<>"'\/]/g, function (s) {
                    return scope.entityMap[s];
                });
            }

            scope.ddTextCollapseText = function(text) {
               // get the length from the attributes
                var maxLength = scope.$eval(attrs.ddTextCollapseMaxLength);
                // check dd-text-collapse-escape attribute and use true as default
                var escape = scope.$eval(attrs.ddTextCollapseEscape);
                if( typeof(escape) == "undefined" ) {
                    escape = true;
                }
                // check dd-text-collapse-nl2br attribute and use true as default
                var nl2br = scope.$eval(attrs.ddTextCollapseNl2br);
                if( typeof(nl2br) == "undefined" ) {
                    nl2br = true;
                }
                if( typeof(text) == "undefined" ) {
                    text = ''+scope.text;
                } else {
                    scope.text = text;
                }
                if( escape ) {
                    text = scope.escapeHtml( text );
                }
                if (text.length > maxLength) {
                    // split the text in two parts, the first always showing
                    var firstPart = String(text).substring(0, maxLength);
                    var secondPart = String(text).substring(maxLength, text.length);
                    if( nl2br ) {
                        firstPartNl2Br = firstPart.replace(/\n/g, "<br />");
                        secondPart = secondPart.replace(/\n/g, "<br />");
                    }
                    // create some new html elements to hold the separate info
                    if( nl2br ) {
                        var firstSpan = $compile('<span  ng-if="!collapsed">' + firstPart + '</span>')(scope);
                        var firstSpan2 = $compile('<span  ng-if="collapsed">' + firstPartNl2Br + '</span>')(scope);
                    } else {
                        var firstSpan = $compile('<span>' + firstPart + '</span>')(scope);
                    }
                    var secondSpan = $compile('<span ng-if="collapsed">' + secondPart + '</span>')(scope);
                    var moreIndicatorSpan = $compile('<span ng-if="!collapsed">... </span>')(scope);
                    var lineBreak = $compile('<br ng-if="collapsed">')(scope);
                    var toggleButton = $compile('<span class="collapse-text-toggle" ng-click="toggle()">{{collapsed ? "less" : "more"}}</span>')(scope);

                    // remove the current contents of the element
                    // and add the new ones we created
                    element.empty();
                    element.append(firstSpan);
                    if( nl2br ) {
                        element.append(firstSpan2);
                    }
                    element.append(secondSpan);
                    element.append(moreIndicatorSpan);
                    element.append(lineBreak);
                    element.append(toggleButton);
                }
                else {
                    element.empty();
                    element.append(text);
                }
            }

            // wait for changes on the text
            attrs.$observe('ddTextCollapseText', function(text) {
                scope.ddTextCollapseText(text);
            });
        }
    };
}]);