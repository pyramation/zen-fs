var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
(function (ErrorCode) {
    ErrorCode[ErrorCode["EPERM"] = 0] = "EPERM";
    ErrorCode[ErrorCode["ENOENT"] = 1] = "ENOENT";
    ErrorCode[ErrorCode["EIO"] = 2] = "EIO";
    ErrorCode[ErrorCode["EBADF"] = 3] = "EBADF";
    ErrorCode[ErrorCode["EACCES"] = 4] = "EACCES";
    ErrorCode[ErrorCode["EBUSY"] = 5] = "EBUSY";
    ErrorCode[ErrorCode["EEXIST"] = 6] = "EEXIST";
    ErrorCode[ErrorCode["ENOTDIR"] = 7] = "ENOTDIR";
    ErrorCode[ErrorCode["EISDIR"] = 8] = "EISDIR";
    ErrorCode[ErrorCode["EINVAL"] = 9] = "EINVAL";
    ErrorCode[ErrorCode["EFBIG"] = 10] = "EFBIG";
    ErrorCode[ErrorCode["ENOSPC"] = 11] = "ENOSPC";
    ErrorCode[ErrorCode["EROFS"] = 12] = "EROFS";
    ErrorCode[ErrorCode["ENOTEMPTY"] = 13] = "ENOTEMPTY";
    ErrorCode[ErrorCode["ENOTSUP"] = 14] = "ENOTSUP";
})(exports.ErrorCode || (exports.ErrorCode = {}));
var ErrorCode = exports.ErrorCode;
var ErrorStrings = {};
ErrorStrings[ErrorCode.EPERM] = 'Operation not permitted.';
ErrorStrings[ErrorCode.ENOENT] = 'No such file or directory.';
ErrorStrings[ErrorCode.EIO] = 'Input/output error.';
ErrorStrings[ErrorCode.EBADF] = 'Bad file descriptor.';
ErrorStrings[ErrorCode.EACCES] = 'Permission denied.';
ErrorStrings[ErrorCode.EBUSY] = 'Resource busy or locked.';
ErrorStrings[ErrorCode.EEXIST] = 'File exists.';
ErrorStrings[ErrorCode.ENOTDIR] = 'File is not a directory.';
ErrorStrings[ErrorCode.EISDIR] = 'File is a directory.';
ErrorStrings[ErrorCode.EINVAL] = 'Invalid argument.';
ErrorStrings[ErrorCode.EFBIG] = 'File is too big.';
ErrorStrings[ErrorCode.ENOSPC] = 'No space left on disk.';
ErrorStrings[ErrorCode.EROFS] = 'Cannot modify a read-only file system.';
ErrorStrings[ErrorCode.ENOTEMPTY] = 'Directory is not empty.';
ErrorStrings[ErrorCode.ENOTSUP] = 'Operation is not supported.';
var ApiError = (function (_super) {
    __extends(ApiError, _super);
    function ApiError(type, message, path) {
        if (message === void 0) { message = ErrorStrings[type]; }
        if (path === void 0) { path = null; }
        _super.call(this, message);
        this.syscall = "";
        this.errno = type;
        this.code = ErrorCode[type];
        this.path = path;
        this.stack = (new Error()).stack;
        this.message = "Error: " + this.code + ": " + message + (this.path ? ", '" + this.path + "'" : '');
    }
    ApiError.prototype.toString = function () {
        return this.message;
    };
    ApiError.prototype.toJSON = function () {
        return {
            errno: this.errno,
            code: this.code,
            path: this.path,
            stack: this.stack,
            message: this.message
        };
    };
    ApiError.fromJSON = function (json) {
        var err = new ApiError(0);
        err.errno = json.errno;
        err.code = json.code;
        err.path = json.path;
        err.stack = json.stack;
        err.message = json.message;
        return err;
    };
    ApiError.prototype.writeToBuffer = function (buffer, i) {
        if (buffer === void 0) { buffer = new Buffer(this.bufferSize()); }
        if (i === void 0) { i = 0; }
        var bytesWritten = buffer.write(JSON.stringify(this.toJSON()), i + 4);
        buffer.writeUInt32LE(bytesWritten, i);
        return buffer;
    };
    ApiError.fromBuffer = function (buffer, i) {
        if (i === void 0) { i = 0; }
        return ApiError.fromJSON(JSON.parse(buffer.toString('utf8', i + 4, i + 4 + buffer.readUInt32LE(i))));
    };
    ApiError.prototype.bufferSize = function () {
        return 4 + Buffer.byteLength(JSON.stringify(this.toJSON()));
    };
    ApiError.FileError = function (code, p) {
        return new ApiError(code, ErrorStrings[code], p);
    };
    ApiError.ENOENT = function (path) {
        return this.FileError(ErrorCode.ENOENT, path);
    };
    ApiError.EEXIST = function (path) {
        return this.FileError(ErrorCode.EEXIST, path);
    };
    ApiError.EISDIR = function (path) {
        return this.FileError(ErrorCode.EISDIR, path);
    };
    ApiError.ENOTDIR = function (path) {
        return this.FileError(ErrorCode.ENOTDIR, path);
    };
    ApiError.EPERM = function (path) {
        return this.FileError(ErrorCode.EPERM, path);
    };
    ApiError.ENOTEMPTY = function (path) {
        return this.FileError(ErrorCode.ENOTEMPTY, path);
    };
    return ApiError;
})(Error);
exports.ApiError = ApiError;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBpX2Vycm9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvcmUvYXBpX2Vycm9yLnRzIl0sIm5hbWVzIjpbIkVycm9yQ29kZSIsIkFwaUVycm9yIiwiQXBpRXJyb3IuY29uc3RydWN0b3IiLCJBcGlFcnJvci50b1N0cmluZyIsIkFwaUVycm9yLnRvSlNPTiIsIkFwaUVycm9yLmZyb21KU09OIiwiQXBpRXJyb3Iud3JpdGVUb0J1ZmZlciIsIkFwaUVycm9yLmZyb21CdWZmZXIiLCJBcGlFcnJvci5idWZmZXJTaXplIiwiQXBpRXJyb3IuRmlsZUVycm9yIiwiQXBpRXJyb3IuRU5PRU5UIiwiQXBpRXJyb3IuRUVYSVNUIiwiQXBpRXJyb3IuRUlTRElSIiwiQXBpRXJyb3IuRU5PVERJUiIsIkFwaUVycm9yLkVQRVJNIiwiQXBpRXJyb3IuRU5PVEVNUFRZIl0sIm1hcHBpbmdzIjoiOzs7OztBQUtBLFdBQVksU0FBUztJQUNuQkEsMkNBQUtBLENBQUFBO0lBQUVBLDZDQUFNQSxDQUFBQTtJQUFFQSx1Q0FBR0EsQ0FBQUE7SUFBRUEsMkNBQUtBLENBQUFBO0lBQUVBLDZDQUFNQSxDQUFBQTtJQUFFQSwyQ0FBS0EsQ0FBQUE7SUFBRUEsNkNBQU1BLENBQUFBO0lBQUVBLCtDQUFPQSxDQUFBQTtJQUFFQSw2Q0FBTUEsQ0FBQUE7SUFBRUEsNkNBQU1BLENBQUFBO0lBQ3pFQSw0Q0FBS0EsQ0FBQUE7SUFBRUEsOENBQU1BLENBQUFBO0lBQUVBLDRDQUFLQSxDQUFBQTtJQUFFQSxvREFBU0EsQ0FBQUE7SUFBRUEsZ0RBQU9BLENBQUFBO0FBQzFDQSxDQUFDQSxFQUhXLGlCQUFTLEtBQVQsaUJBQVMsUUFHcEI7QUFIRCxJQUFZLFNBQVMsR0FBVCxpQkFHWCxDQUFBO0FBSUQsSUFBSSxZQUFZLEdBQTZCLEVBQUUsQ0FBQztBQUNoRCxZQUFZLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxHQUFHLDBCQUEwQixDQUFDO0FBQzNELFlBQVksQ0FB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OUJhLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLFNBQVNBLENBQUNBLFNBQVNBLENBQUNBLEtBQUtBLEVBQUVBLElBQUlBLENBQUNBLENBQUNBO0lBQy9DQSxDQUFDQTtJQUVhYixrQkFBU0EsR0FBdkJBLFVBQXdCQSxJQUFZQTtRQUNsQ2MsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsU0FBU0EsQ0FBQ0EsU0FBU0EsRUFBRUEsSUFBSUEsQ0FBQ0EsQ0FBQ0E7SUFDbkRBLENBQUNBO0lBQ0hkLGVBQUNBO0FBQURBLENBQUNBLEFBeEdELEVBQThCLEtBQUssRUF3R2xDO0FBeEdZLGdCQUFRLFdBd0dwQixDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBTdGFuZGFyZCBsaWJjIGVycm9yIGNvZGVzLiBBZGQgbW9yZSB0byB0aGlzIGVudW0gYW5kIEVycm9yU3RyaW5ncyBhcyB0aGV5IGFyZVxuICogbmVlZGVkLlxuICogQHVybCBodHRwOi8vd3d3LmdudS5vcmcvc29mdHdhcmUvbGliYy9tYW51YWwvaHRtbF9ub2RlL0Vycm9yLUNvZGVzLmh0bWxcbiAqL1xuZXhwb3J0IGVudW0gRXJyb3JDb2RlIHtcbiAgRVBFUk0sIEVOT0VOVCwgRUlPLCBFQkFERiwgRUFDQ0VTLCBFQlVTWSwgRUVYSVNULCBFTk9URElSLCBFSVNESVIsIEVJTlZBTCxcbiAgRUZCSUcsIEVOT1NQQywgRVJPRlMsIEVOT1RFTVBUWSwgRU5PVFNVUFxufVxuLyoqXG4gKiBTdHJpbmdzIGFzc29jaWF0ZWQgd2l0aCBlYWNoIGVycm9yIGNvZGUuXG4gKi9cbnZhciBFcnJvclN0cmluZ3M6IHtbY29kZTogc3RyaW5nXTogc3RyaW5nfSA9IHt9O1xuRXJyb3JTdHJpbmdzW0Vycm9yQ29kZS5FUEVSTV0gPSAnT3BlcmF0aW9uIG5vdCBwZXJtaXR0ZWQuJztcbkVycm9yU3RyaW5nc1tFcnJvckNvZGUuRU5PRU5UXSA9ICdObyBzdWNoIGZpbGUgb3IgZGlyZWN0b3J5Lic7XG5FcnJvclN0cmluZ3NbRXJyb3JDb2RlLkVJT10gPSAnSW5wdXQvb3V0cHV0IGVycm9yLic7XG5FcnJvclN0cmluZ3NbRXJyb3JDb2RlLkVCQURGXSA9ICdCYWQgZmlsZSBkZXNjcmlwdG9yLic7XG5FcnJvclN0cmluZ3NbRXJyb3JDb2RlLkVBQ0NFU10gPSAnUGVybWlzc2lvbiBkZW5pZWQuJztcbkVycm9yU3RyaW5nc1tFcnJvckNvZGUuRUJVU1ldID0gJ1Jlc291cmNlIGJ1c3kgb3IgbG9ja2VkLic7XG5FcnJvclN0cmluZ3NbRXJyb3JDb2RlLkVFWElTVF0gPSAnRmlsZSBleGlzdHMuJztcbkVycm9yU3RyaW5nc1tFcnJvckNvZGUuRU5PVERJUl0gPSAnRmlsZSBpcyBub3QgYSBkaXJlY3RvcnkuJztcbkVycm9yU3RyaW5nc1tFcnJvckNvZGUuRUlTRElSXSA9ICdGaWxlIGlzIGEgZGlyZWN0b3J5Lic7XG5FcnJvclN0cmluZ3NbRXJyb3JDb2RlLkVJTlZBTF0gPSAnSW52YWxpZCBhcmd1bWVudC4nO1xuRXJyb3JTdHJpbmdzW0Vycm9yQ29kZS5FRkJJR10gPSAnRmlsZSBpcyB0b28gYmlnLic7XG5FcnJvclN0cmluZ3NbRXJyb3JDb2RlLkVOT1NQQ10gPSAnTm8gc3BhY2UgbGVmdCBvbiBkaXNrLic7XG5FcnJvclN0cmluZ3NbRXJyb3JDb2RlLkVST0ZTXSA9ICdDYW5ub3QgbW9kaWZ5IGEgcmVhZC1vbmx5IGZpbGUgc3lzdGVtLic7XG5FcnJvclN0cmluZ3NbRXJyb3JDb2RlLkVOT1RFTVBUWV0gPSAnRGlyZWN0b3J5IGlzIG5vdCBlbXB0eS4nO1xuRXJyb3JTdHJpbmdzW0Vycm9yQ29kZS5FTk9UU1VQXSA9ICdPcGVyYXRpb24gaXMgbm90IHN1cHBvcnRlZC4nO1xuXG4vKipcbiAqIFJlcHJlc2VudHMgYSBCcm93c2VyRlMgZXJyb3IuIFBhc3NlZCBiYWNrIHRvIGFwcGxpY2F0aW9ucyBhZnRlciBhIGZhaWxlZFxuICogY2FsbCB0byB0aGUgQnJvd3NlckZTIEFQSS5cbiAqIGVycm5vPzogbnVtYmVyO1xuICAgICAgICBjb2RlPzogc3RyaW5nO1xuICAgICAgICBwYXRoPzogc3RyaW5nO1xuICAgICAgICBzeXNjYWxsPzogc3RyaW5nO1xuICAgICAgICBzdGFjaz86IHN0cmluZztcbiAqL1xuZXhwb3J0IGNsYXNzIEFwaUVycm9yIGV4dGVuZHMgRXJyb3IgaW1wbGVtZW50cyBOb2RlSlMuRXJybm9FeGNlcHRpb24ge1xuICBwdWJsaWMgZXJybm86IEVycm9yQ29kZTtcbiAgcHVibGljIGNvZGU6IHN0cmluZztcbiAgcHVibGljIHBhdGg6IHN0cmluZztcbiAgLy8gVW5zdXBwb3J0ZWQuXG4gIHB1YmxpYyBzeXNjYWxsOiBzdHJpbmcgPSBcIlwiO1xuICBwdWJsaWMgc3RhY2s6IHN0cmluZztcblxuICAvKipcbiAgICogUmVwcmVzZW50cyBhIEJyb3dzZXJGUyBlcnJvci4gUGFzc2VkIGJhY2sgdG8gYXBwbGljYXRpb25zIGFmdGVyIGEgZmFpbGVkXG4gICAqIGNhbGwgdG8gdGhlIEJyb3dzZXJGUyBBUEkuXG4gICAqXG4gICAqIEVycm9yIGNvZGVzIG1pcnJvciB0aG9zZSByZXR1cm5lZCBieSByZWd1bGFyIFVuaXggZmlsZSBvcGVyYXRpb25zLCB3aGljaCBpc1xuICAgKiB3aGF0IE5vZGUgcmV0dXJucy5cbiAgICogQGNvbnN0cnVjdG9yIEFwaUVycm9yXG4gICAqIEBwYXJhbSB0eXBlIFRoZSB0eXBlIG9mIHRoZSBlcnJvci5cbiAgICogQHBhcmFtIFttZXNzYWdlXSBBIGRlc2NyaXB0aXZlIGVycm9yIG1lc3NhZ2UuXG4gICAqL1xuICBjb25zdHJ1Y3Rvcih0eXBlOiBFcnJvckNvZGUsIG1lc3NhZ2U6IHN0cmluZyA9IEVycm9yU3RyaW5nc1t0eXBlXSwgcGF0aDogc3RyaW5nID0gbnVsbCkge1xuICAgIHN1cGVyKG1lc3NhZ2UpO1xuICAgIHRoaXMuZXJybm8gPSB0eXBlO1xuICAgIHRoaXMuY29kZSA9IEVycm9yQ29kZVt0eXBlXTtcbiAgICB0aGlzLnBhdGggPSBwYXRoO1xuICAgIHRoaXMuc3RhY2sgPSAoPGFueT5uZXcgRXJyb3IoKSkuc3RhY2s7XG4gICAgdGhpcy5tZXNzYWdlID0gYEVycm9yOiAke3RoaXMuY29kZX06ICR7bWVzc2FnZX0ke3RoaXMucGF0aCA/IGAsICcke3RoaXMucGF0aH0nYCA6ICcnfWA7XG4gIH1cblxuICAvKipcbiAgICogQHJldHVybiBBIGZyaWVuZGx5IGVycm9yIG1lc3NhZ2UuXG4gICAqL1xuICBwdWJsaWMgdG9TdHJpbmcoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5tZXNzYWdlO1xuICB9XG5cbiAgcHVibGljIHRvSlNPTigpOiBhbnkge1xuICAgIHJldHVybiB7XG4gICAgICBlcnJubzogdGhpcy5lcnJubyxcbiAgICAgIGNvZGU6IHRoaXMuY29kZSxcbiAgICAgIHBhdGg6IHRoaXMucGF0aCxcbiAgICAgIHN0YWNrOiB0aGlzLnN0YWNrLFxuICAgICAgbWVzc2FnZTogdGhpcy5tZXNzYWdlXG4gICAgfTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgZnJvbUpTT04oanNvbjogYW55KTogQXBpRXJyb3Ige1xuICAgIHZhciBlcnIgPSBuZXcgQXBpRXJyb3IoMCk7XG4gICAgZXJyLmVycm5vID0ganNvbi5lcnJubztcbiAgICBlcnIuY29kZSA9IGpzb24uY29kZTtcbiAgICBlcnIucGF0aCA9IGpzb24ucGF0aDtcbiAgICBlcnIuc3RhY2sgPSBqc29uLnN0YWNrO1xuICAgIGVyci5tZXNzYWdlID0ganNvbi5tZXNzYWdlO1xuICAgIHJldHVybiBlcnI7XG4gIH1cblxuICAvKipcbiAgICogV3JpdGVzIHRoZSBBUEkgZXJyb3IgaW50byBhIGJ1ZmZlci5cbiAgICovXG4gIHB1YmxpYyB3cml0ZVRvQnVmZmVyKGJ1ZmZlcjogQnVmZmVyID0gbmV3IEJ1ZmZlcih0aGlzLmJ1ZmZlclNpemUoKSksIGk6IG51bWJlciA9IDApOiBCdWZmZXIge1xuICAgIHZhciBieXRlc1dyaXR0ZW4gPSBidWZmZXIud3JpdGUoSlNPTi5zdHJpbmdpZnkodGhpcy50b0pTT04oKSksIGkgKyA0KTtcbiAgICBidWZmZXIud3JpdGVVSW50MzJMRShieXRlc1dyaXR0ZW4sIGkpO1xuICAgIHJldHVybiBidWZmZXI7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyBhbiBBcGlFcnJvciBvYmplY3QgZnJvbSBhIGJ1ZmZlci5cbiAgICovXG4gIHB1YmxpYyBzdGF0aWMgZnJvbUJ1ZmZlcihidWZmZXI6IEJ1ZmZlciwgaTogbnVtYmVyID0gMCk6IEFwaUVycm9yIHtcbiAgICByZXR1cm4gQXBpRXJyb3IuZnJvbUpTT04oSlNPTi5wYXJzZShidWZmZXIudG9TdHJpbmcoJ3V0ZjgnLCBpICsgNCwgaSArIDQgKyBidWZmZXIucmVhZFVJbnQzMkxFKGkpKSkpO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoZSBzaXplIG9mIHRoZSBBUEkgZXJyb3IgaW4gYnVmZmVyLWZvcm0gaW4gYnl0ZXMuXG4gICAqL1xuICBwdWJsaWMgYnVmZmVyU2l6ZSgpOiBudW1iZXIge1xuICAgIC8vIDQgYnl0ZXMgZm9yIHN0cmluZyBsZW5ndGguXG4gICAgcmV0dXJuIDQgKyBCdWZmZXIuYnl0ZUxlbmd0aChKU09OLnN0cmluZ2lmeSh0aGlzLnRvSlNPTigpKSk7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIEZpbGVFcnJvcihjb2RlOiBFcnJvckNvZGUsIHA6IHN0cmluZyk6IEFwaUVycm9yIHtcbiAgICByZXR1cm4gbmV3IEFwaUVycm9yKGNvZGUsIEVycm9yU3RyaW5nc1tjb2RlXSwgcCk7XG4gIH1cbiAgcHVibGljIHN0YXRpYyBFTk9FTlQocGF0aDogc3RyaW5nKTogQXBpRXJyb3Ige1xuICAgIHJldHVybiB0aGlzLkZpbGVFcnJvcihFcnJvckNvZGUuRU5PRU5ULCBwYXRoKTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgRUVYSVNUKHBhdGg6IHN0cmluZyk6IEFwaUVycm9yIHtcbiAgICByZXR1cm4gdGhpcy5GaWxlRXJyb3IoRXJyb3JDb2RlLkVFWElTVCwgcGF0aCk7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIEVJU0RJUihwYXRoOiBzdHJpbmcpOiBBcGlFcnJvciB7XG4gICAgcmV0dXJuIHRoaXMuRmlsZUVycm9yKEVycm9yQ29kZS5FSVNESVIsIHBhdGgpO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBFTk9URElSKHBhdGg6IHN0cmluZyk6IEFwaUVycm9yIHtcbiAgICByZXR1cm4gdGhpcy5GaWxlRXJyb3IoRXJyb3JDb2RlLkVOT1RESVIsIHBhdGgpO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBFUEVSTShwYXRoOiBzdHJpbmcpOiBBcGlFcnJvciB7XG4gICAgcmV0dXJuIHRoaXMuRmlsZUVycm9yKEVycm9yQ29kZS5FUEVSTSwgcGF0aCk7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIEVOT1RFTVBUWShwYXRoOiBzdHJpbmcpOiBBcGlFcnJvciB7XG4gICAgcmV0dXJuIHRoaXMuRmlsZUVycm9yKEVycm9yQ29kZS5FTk9URU1QVFksIHBhdGgpO1xuICB9XG59XG4iXX0=