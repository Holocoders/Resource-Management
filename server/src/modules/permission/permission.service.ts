import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Permission, PermissionDocument } from './entities/permission.entity';
import { NodeService } from '../node/node.service';
import { CreatePermissionInput } from './dto/create-permission.input';
import * as Mongoose from 'mongoose';

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

  getPermissionNode(userId: string): Promise<string> {
    return this.permissionModel
      .findOne({ userId: userId as any }) // TODO: BUG : The query is not working as expected
      .then((permission) => {
        if (permission.nodeId == null) {
          return null;
        }
        return permission.nodeId.toString();
      });
  }

  permissionCheck(userId: string, nodeId: string) {
    return this.permissionModel
      .findOne({ userId: userId as any, nodeId: nodeId as any })
      .then(async (permission) => {
        const node = permission.nodeId;
        if (node.toString() == nodeId) return true;
        else {
          const parents = await this.nodeService.getParents(nodeId);
          return !!parents.includes(node);
        }
      });
  }

  findAll(id: string) {
    return this.permissionModel.find({ nodeId: id as any });
  }
}
