"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateStatusDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const status_device_dto_1 = require("./status-device.dto");
class UpdateStatusDto extends (0, mapped_types_1.PartialType)(status_device_dto_1.CreateStatusDto) {
}
exports.UpdateStatusDto = UpdateStatusDto;
//# sourceMappingURL=update-status.dto.js.map