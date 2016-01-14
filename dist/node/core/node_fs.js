var FS_1 = require('./FS');
var fs = new FS_1.default();
var _fsMock = {};
var FSProto = FS_1.default.prototype;
Object.keys(FSProto).forEach(function (key) {
    if (typeof fs[key] === 'function') {
        _fsMock[key] = function () {
            return fs[key].apply(fs, arguments);
        };
    }
    else {
        _fsMock[key] = fs[key];
    }
});
_fsMock['changeFSModule'] = function (newFs) {
    fs = newFs;
};
_fsMock['getFSModule'] = function () {
    return fs;
};
_fsMock['_wrapCb'] = function (cb, numArgs) {
    return fs._wrapCb(cb, numArgs);
};
_fsMock['FS'] = FS_1.default;
module.exports = _fsMock;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9kZV9mcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb3JlL25vZGVfZnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsbUJBQXNDLE1BQU0sQ0FBQyxDQUFBO0FBVzdDLElBQUksRUFBRSxHQUFHLElBQUksWUFBRSxFQUFFLENBQUM7QUFDbEIsSUFBSSxPQUFPLEdBQW1CLEVBQUUsQ0FBQztBQUVqQyxJQUFJLE9BQU8sR0FBRyxZQUFFLENBQUMsU0FBUyxDQUFDO0FBQzNCLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQUMsR0FBRztJQUMvQixFQUFFLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxHQUFHLENBQUMsS0FBSyxVQUFVLENBQUMsQ0FBQyxDQUFDO1FBQ2xDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRztZQUNiLE1BQU0sQ0FBYSxFQUFFLENBQUMsR0FBRyxDQUFFLENBQUMsS0FBSyxDQUFDLEVBQUUsRUFBRSxTQUFTLENBQUMsQ0FBQztRQUNuRCxDQUFDLENBQUM7SUFDSixDQUFDO0lBQUMsSUFBSSxDQUFDLENBQUM7UUFDTixPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3pCLENBQUM7QUFDSCxDQUFDLENBQUMsQ0FBQztBQUVILE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLFVBQVMsS0FBUztJQUM1QyxFQUFFLEdBQUcsS0FBSyxDQUFDO0FBQ2IsQ0FBQyxDQUFBO0FBQ0QsT0FBTyxDQUFDLGFBQWEsQ0FBQyxHQUFHO0lBQ3ZCLE1BQU0sQ0FBQyxFQUFFLENBQUM7QUFDWixDQUFDLENBQUE7QUFDRCxPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsVUFBUyxFQUFZLEVBQUUsT0FBZTtJQUN6RCxNQUFNLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxFQUFFLEVBQUUsT0FBTyxDQUFDLENBQUM7QUFDakMsQ0FBQyxDQUFDO0FBQ0YsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLFlBQUUsQ0FBQztBQUVuQixpQkFBUyxPQUFPLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge2RlZmF1bHQgYXMgRlMsIEZTTW9kdWxlfSBmcm9tICcuL0ZTJztcbmltcG9ydCB7RmlsZVN5c3RlbX0gZnJvbSAnLi9maWxlX3N5c3RlbSc7XG5pbXBvcnQge0FwaUVycm9yfSBmcm9tICcuL2FwaV9lcnJvcic7XG5pbXBvcnQgU3RhdHMgZnJvbSAnLi9ub2RlX2ZzX3N0YXRzJztcblxuLy8gTWFudWFsbHkgZXhwb3J0IHRoZSBpbmRpdmlkdWFsIHB1YmxpYyBmdW5jdGlvbnMgb2YgZnMuXG4vLyBSZXF1aXJlZCBiZWNhdXNlIHNvbWUgY29kZSB3aWxsIGludm9rZSBmdW5jdGlvbnMgb2ZmIG9mIHRoZSBtb2R1bGUuXG4vLyBlLmcuOlxuLy8gbGV0IHdyaXRlRmlsZSA9IGZzLndyaXRlRmlsZTtcbi8vIHdyaXRlRmlsZSguLi4pXG5cbmxldCBmcyA9IG5ldyBGUygpO1xubGV0IF9mc01vY2s6IEZTTW9kdWxlID0gPGFueT4ge307XG5cbmxldCBGU1Byb3RvID0gRlMucHJvdG90eXBlO1xuT2JqZWN0LmtleXMoRlNQcm90bykuZm9yRWFjaCgoa2V5KSA9PiB7XG4gIGlmICh0eXBlb2YgZnNba2V5XSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIF9mc01vY2tba2V5XSA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuICg8RnVuY3Rpb24+IGZzW2tleV0pLmFwcGx5KGZzLCBhcmd1bWVudHMpO1xuICAgIH07XG4gIH0gZWxzZSB7XG4gICAgX2ZzTW9ja1trZXldID0gZnNba2V5XTtcbiAgfVxufSk7XG5cbl9mc01vY2tbJ2NoYW5nZUZTTW9kdWxlJ10gPSBmdW5jdGlvbihuZXdGczogRlMpOiB2b2lkIHtcbiAgZnMgPSBuZXdGcztcbn1cbl9mc01vY2tbJ2dldEZTTW9kdWxlJ10gPSBmdW5jdGlvbigpOiBGUyB7XG4gIHJldHVybiBmcztcbn1cbl9mc01vY2tbJ193cmFwQ2InXSA9IGZ1bmN0aW9uKGNiOiBGdW5jdGlvbiwgbnVtQXJnczogbnVtYmVyKTogRnVuY3Rpb24ge1xuICByZXR1cm4gZnMuX3dyYXBDYihjYiwgbnVtQXJncyk7XG59O1xuX2ZzTW9ja1snRlMnXSA9IEZTO1xuXG5leHBvcnQgPSBfZnNNb2NrO1xuIl19