import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Permission, PermissionDocument } from './entities/permission.entity';
import { NodeService } from '../node/node.service';
import { CreatePermissionInput } from './dto/create-permission.input';

@Injectable()
export class PermissionService {
  constructor(
    @InjectModel(Permission.name)
    private permissionModel: Model<PermissionDocument>,
    @Inject(forwardRef(() => NodeService)) private nodeService: NodeService,
  ) {}

  async create(userId: string, nodeId: string) {
    const createNodeInput = new CreatePermissionInput(userId, nodeId);
    const PermissionDocument = new this.permissionModel(createNodeInput);
    const permission = await PermissionDocument.save();
    return permission._id;
  }

  permissionCheck(userId: string, nodeId: string) {
    return this.permissionModel
      .findOne({ userId: userId, nodeId: nodeId })
      .then(async (permission) => {
        const node = permission.nodeId;
        if (node == nodeId) return true;
        else {
          const parents = await this.nodeService.getParents(nodeId);
          return !!parents.includes(node);
        }
      });
  }
}
