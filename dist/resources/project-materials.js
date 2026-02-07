import { BaseResource } from "./base.js";
export class ProjectMaterialsResource extends BaseResource {
    list(params) {
        return this.client.request("/projects-v2/materials.list", params);
    }
    info(params) {
        return this.client.request("/projects-v2/materials.info", params);
    }
    create(params) {
        return this.client.request("/projects-v2/materials.create", params);
    }
    update(params) {
        return this.client.request("/projects-v2/materials.update", params);
    }
    duplicate(params) {
        return this.client.request("/projects-v2/materials.duplicate", params);
    }
    delete(params) {
        return this.client.request("/projects-v2/materials.delete", params);
    }
    assign(params) {
        return this.client.request("/projects-v2/materials.assign", params);
    }
    unassign(params) {
        return this.client.request("/projects-v2/materials.unassign", params);
    }
}
//# sourceMappingURL=project-materials.js.map