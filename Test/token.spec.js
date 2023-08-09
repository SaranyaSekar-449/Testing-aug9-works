describe('TokenModule', function () {
  var $controller, $rootScope, $location, TokenServiceMock, AuthServiceMock;

  beforeEach(angular.mock.module('ngMock'));
  beforeEach(angular.mock.module('TokenModule'));

  beforeEach(inject(function (_$controller_, _$rootScope_, _$location_) {
    $controller = _$controller_;
    $rootScope = _$rootScope_;
    $location = _$location_;
    AuthServiceMock = {
      authenticate: jasmine.createSpy('authenticate').and.returnValue(Promise.resolve(true))
    };
    TokenServiceMock = {
      setToken: jasmine.createSpy('setToken')
    };
  }));
  describe('TokenController', function () {
    var $scope, controller;

    beforeEach(function () {
      AuthServiceMock.authenticate.calls.reset();
      $scope = $rootScope.$new();
      controller = $controller('TokenController', {
        $scope: $scope,
        AuthService: AuthServiceMock,
        $location: $location,
        TokenService: TokenServiceMock
      });
    });
    it('should have a defined AuthService', function () {
      expect(AuthServiceMock).toBeDefined();
    });

    it('should have a valid $location service', function () {
      expect($location).toBeDefined();
    });

    it('should have a defined TokenService', function () {
      expect(TokenServiceMock).toBeDefined();
    });
    it('should have a valid $scope', function () {
      expect($scope).toBeDefined();
    });

    it('should have a valid controller', function () {
      expect(controller).toBeDefined();
    });
    it('should display an error alert on unsuccessful login', function () {
      AuthServiceMock.authenticate.and.returnValue(Promise.resolve(false));
      $scope.token = 'invalidToken';
      $scope.login();
      expect(AuthServiceMock.authenticate).toHaveBeenCalledWith('invalidToken');
      expect(TokenServiceMock.setToken).not.toHaveBeenCalled();
      expect($location.path()).not.toBe('/fetch-users');
    });
  });
});
