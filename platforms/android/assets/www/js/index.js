(function(angular) {
  'use strict';


var wadwee = angular.module('wadwee', ['headerCtrl','footerCtrl','contentCtrl'])
	.controller('PanelMenuCtrl', PanelMenuCtrl);


var headerCtrl = angular.module('headerCtrl', ['ngMaterial']);

headerCtrl.controller('headerControl', function($scope, $http, $mdPanel) {
    this.settings = {
      name: 'settings',
      items: ['test']
    };
    this.favorite = {
      name: 'favorite',
      items: [
        'Add to Favorites'
      ]
    };
    this.more = {
      name: 'more',
      items: [
        'Account',
        'Sign Out'
      ]
    };
    this.tools = {
      name: 'tools',
      items: [
        'Create',
        'Delete'
      ]
    };
    this.code = {
      name: 'code',
      items: [
        'See Source',
        'See Commits'
      ]
    };

    this.menuTemplate = '' +
        '<div class="menu-panel" md-whiteframe="4">' +
        '  <div class="menu-content">' +
        '    <div class="menu-item" ng-repeat="item in ctrl.items">' +
        '      <button class="md-button">' +
        '        <span>{{item}}</span>' +
        '      </button>' +
        '    </div>' +
        '    <md-divider></md-divider>' +
        '    <div class="menu-item">' +
        '      <button class="md-button" ng-click="ctrl.closeMenu()">' +
        '        <span>Close Menu</span>' +
        '      </button>' +
        '    </div>' +
        '  </div>' +
        '</div>';

    $mdPanel.newPanelGroup('toolbar', {
      maxOpen: 2
    });

    $mdPanel.newPanelGroup('menus', {
      maxOpen: 3
    });

    this.showToolbarMenu = function($event, menu) {
        console.log("Ok");
        var template = this.menuTemplate;

          var position = $mdPanel.newPanelPosition()
          .relativeTo($event.srcElement)
          .addPanelPosition(
            $mdPanel.xPosition.ALIGN_START,
            $mdPanel.yPosition.BELOW
          );

          var config = {
            id: 'toolbar_' + menu.name,
            attachTo: angular.element(document.body),
            controller: PanelMenuCtrl,
            controllerAs: 'ctrl',
            template: template,
            position: position,
            panelClass: 'menu-panel-container',
            locals: {
                items: menu.items
            },
            openFrom: $event,
            focusOnOpen: false,
            zIndex: 100,
            propagateContainerEvents: true,
            groupName: ['toolbar', 'menus']
          };
        $mdPanel.open(config);
    };
});


function PanelMenuCtrl(mdPanelRef) {
    this.closeMenu = function() {
        mdPanelRef && mdPanelRef.close();
    }
}

var footerCtrl = angular.module('footerCtrl', ['ngMaterial']);
footerCtrl.controller("footerControl", function($scope){

var yest='ok';//     //...    

});

var contentCtrl = angular.module('contentCtrl', ['ngMaterial']);
contentCtrl.controller("contentControl", function($scope){

    this.contents = [{"name":"Films", "id":1},{"name":"Maison", "id":2}]; // Starter
    this.children="list";

    this.showContent = function($event, id, type) {
      console.log(id, type);

      if (type=="category"){ // Here we'll call and displayed a category
        this.typeC="category";
        this.checkBox=false;
        this.parentItemId=null;
        this.children="list";
        this.contents = [{"name":"Films", "id":1},{"name":"Maison", "id":2}]; // 
      }
      else if (type=="list"){ // Here we'll call and displayed a list
        this.typeC="list";
        this.checkBox=false;
        this.parentItemId=1;
        this.children="item";
        this.contents = [{"name":"Films à voir", "id":1},{"name":"Films cultes", "id":2},{"name":"Séries", "id":3}]; // Simulation
      }
      else if (type=="item"){ // Here we'll call and displayed a items
        this.typeC="item";
        this.checkBox=true;
        this.parentItemId=1;
        this.children=null;
        this.contents = [{"name":"Titanic", "id":1, "checked":true},{"name":"Fight Club", "id":2, "checked":false}]; // simu
      }
    };



    function onBackKeyDown() {
        // Handle the back button
        var  targetType;
        if (this.typeC == "list"){targetType="category"}
        else if (this.typeC == "item"){targetType="list"}
        showContent(this.parentItemId, targetType);
    };

    document.addEventListener("backbutton", onBackKeyDown, false);

});



})(window.angular);